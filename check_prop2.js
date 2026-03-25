const { createClient } = require("@supabase/supabase-js");

// Read from .env manually to avoid dotenv
const fs = require("fs");
const envData = fs.readFileSync(".env", "utf8");
const envVars = {};
envData.split("\n").forEach(line => {
  const [key, ...rest] = line.split("=");
  if (key && rest.length) envVars[key.trim()] = rest.join("=").trim().replace(/\r/g, '');
});

const supabase = createClient(envVars.VITE_SUPABASE_URL, envVars.VITE_SUPABASE_ANON_KEY);

async function check() {
  const { data, error } = await supabase.from("propiedades").select("idpropiedad, titulo, idusuario, estadoPublicacion").order("idpropiedad", { ascending: false }).limit(3);
  console.log("Latest properties:", JSON.stringify(data, null, 2));
  if (error) console.error("Error:", error);
}

check();
