const fs = require("fs");
const { createClient } = require("@supabase/supabase-js");

const envData = fs.readFileSync(".env", "utf8");
const envVars = {};
envData.split("\n").forEach(line => {
  const [key, ...rest] = line.split("=");
  if (key && rest.length) envVars[key.trim()] = rest.join("=").trim().replace(/\r/g, '');
});

const supabase = createClient(envVars.VITE_SUPABASE_URL, envVars.VITE_SUPABASE_ANON_KEY);

async function testInsert() {
  const mockProp = {
    titulo: 'Test Destacada Trigger',
    idusuario: 17, 
    estadoPublicacion: 'destacada',
    tipoOperacion: 'Venta',
    tipoPropiedad: 'apartamento',
    precio: 100,
    area: 10,
    direccion: '123 Test',
    ciudad: 'City',
    departamento: 'Dept',
    habitaciones: 1,
    banos: 1,
    estrato: 1
  };
  
  console.log("Inserting property as 'destacada'...");
  const { data: inserted, error: insertError } = await supabase
    .from("propiedades")
    .insert([mockProp])
    .select()
    .single();

  if (insertError) {
    console.error("Insert Error:", insertError);
    return;
  }
  
  console.log("Inserted property raw state:", inserted.estadoPublicacion);
}

testInsert();
