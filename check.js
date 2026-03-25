import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://votkgvlsultmgnypgzis.supabase.co';
// Using the service key to bypass RLS for debugging
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkAndFix() {
  console.log("Checking User 17...");
  const { data: user } = await supabase.from('usuarios').select('plan, rol').eq('idusuario', 17).single();
  console.log("User 17 plan:", user?.plan, "rol:", user?.rol);

  console.log("Updating User 17 to premium...");
  await supabase.from('usuarios').update({ plan: 'premium', rol: 'premium' }).eq('idusuario', 17);

  console.log("Checking Property 125...");
  const { data: prop } = await supabase.from('propiedades').select('estadoPublicacion, titulo').eq('idpropiedad', 125).single();
  console.log("Property 125 estadoPublicacion:", prop?.estadoPublicacion);

  console.log("Updating Property 125 to destacada...");
  const { error } = await supabase.from('propiedades').update({ estadoPublicacion: 'destacada' }).eq('idpropiedad', 125);
  if (error) {
    console.error("Error updating property:", error);
  } else {
    console.log("Successfully updated property 125 to destacada!");
  }
}

checkAndFix().catch(console.error);
