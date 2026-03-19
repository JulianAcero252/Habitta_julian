import { createClient } from '@supabase/supabase-js';

const url = 'https://votkgvlsultmgnypgzis.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvdGtndmxzdWx0bWdueXBnemlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MzExNDMsImV4cCI6MjA4NjQwNzE0M30.trZdF5g-mw0YhXrlXxfiAkLIub-9kte8cEXgmfaoELQ';
const supabase = createClient(url, key);

async function testInsert() {
  console.log('Autenticando...');
  
  // Create a random email
  const testEmail = `test_${Date.now()}@test.com`;
  
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: testEmail,
    password: 'password123',
    options: { data: { nombre: 'Tester' } }
  });

  if (authError) {
    console.error('Auth error:', authError);
    return;
  }
  
  // Ensure we have a session
  console.log('Autenticado. Intentando crear propiedad...');

  // Asumimos que idusuario es un entero en la BD. 
  // Intentaremos insertar sin idusuario si no lo tenemos, o buscaremos uno.
  // Pero primero intentemos insertar y ver si el RLS salta.
  
  const { data, error } = await supabase
    .from("propiedades")
    .insert({
      titulo: 'Casa de prueba',
      descripcion: 'Prueba',
      precio: 100,
      idusuario: 1 // hardcoded just to test the RLS
    })
    .select()
    .single();

  if (error) {
    console.error('Error insertando propiedad:', error);
  } else {
    console.log(`Success!`, data);
  }
  
  // Limpieza si es posible
}

testInsert();
