import { createClient } from "@supabase/supabase-js";
import 'dotenv/config';

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function check() {
  const { data, error } = await supabase.from("propiedades").select("idpropiedad, titulo, idusuario, estadoPublicacion").order("idpropiedad", { ascending: false }).limit(3);
  console.log("Latest properties:", JSON.stringify(data, null, 2));
  if (error) console.error("Error:", error);
}

check();
