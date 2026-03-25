import { createClient } from "@supabase/supabase-js";
import 'dotenv/config';

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function testInsert() {
  const mockProp = {
    titulo: 'Test Destacada Trigger',
    idusuario: 17, // The user from the last error payload
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
