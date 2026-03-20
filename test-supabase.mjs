import { createClient } from '@supabase/supabase-js';

const url = 'https://votkgvlsultmgnypgzis.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvdGtndmxzdWx0bWdueXBnemlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MzExNDMsImV4cCI6MjA4NjQwNzE0M30.trZdF5g-mw0YhXrlXxfiAkLIub-9kte8cEXgmfaoELQ';
const supabase = createClient(url, key);

async function extractUserData() {
  const { data, error } = await supabase
    .from("usuarios")
    .select("idusuario, nombre, correo, estadocuenta")
    .eq("nombre", "general");

  if (error) {
    console.error('Error:', error);
  } else {
    console.log('User data:', data);
  }
}

extractUserData();
