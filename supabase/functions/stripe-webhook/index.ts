import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.20.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

console.log("Stripe Webhook function is starting up...");

// Stripe CLI testing secret is generally distinct from dashboard webhook secret
const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") as string, {
  apiVersion: "2023-10-16",
  // Usar fetch http client ya que estamos en Deno (Edge Function)
  httpClient: Stripe.createFetchHttpClient(),
});

// Requerido por Stripe en entornos Deno/Edge
const cryptoProvider = Stripe.createSubtleCryptoProvider();

serve(async (req) => {
  const signature = req.headers.get("Stripe-Signature");
  const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");

  if (!signature || !webhookSecret) {
    return new Response("Faltan variables de entorno o la firma", { status: 400 });
  }

  try {
    // Leemos el raw body (texto) para verificar la firma de Stripe
    const body = await req.text();
    
    let event;
    try {
      event = await stripe.webhooks.constructEventAsync(
        body,
        signature,
        webhookSecret,
        undefined,
        cryptoProvider
      );
    } catch (err: any) {
      console.error(`Firma de Webhook Invalida: ${err.message}`);
      return new Response(`Webhook Error: ${err.message}`, { status: 400 });
    }

    // Procesar evento de pago exitoso
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      
      // Obtenemos el ID del usuario directamente usando el client_reference_id que pasamos al Payment Link
      const idUsuario = session.client_reference_id; 

      if (idUsuario) {
        // Inicializamos supabaseAdmin bypassing RLS (usando Service Role) para poder actualizar sin sesión activa
        const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
        const supabaseServiceRoleUrl = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
        
        const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleUrl);

        // Actualizar el plan del usuario a 'premium'
        const { error } = await supabaseAdmin
          .from("usuarios")
          .update({ plan: "premium" })
          .eq("idusuario", idUsuario);

        if (error) {
          console.error(`Error actualizando el plan del usuario ${idUsuario}:`, error);
          return new Response("Error al actualizar la base de datos", { status: 500 });
        }
        
        console.log(`¡Pago completado! Usuario ${idUsuario} actualizado a PREMIUM.`);
      } else {
        console.warn("Se completó una sesión de pago, pero no contenía 'client_reference_id'. No se pudo asignar Premium.");
      }
    }

    // Retorna OK para que Stripe no reintente el webhook
    return new Response(JSON.stringify({ received: true }), { 
      status: 200, 
      headers: { "Content-Type": "application/json" } 
    });

  } catch (err: any) {
    console.error(`Error de Servidor: ${err.message}`);
    return new Response(`Internal Server Error: ${err.message}`, { status: 500 });
  }
});
