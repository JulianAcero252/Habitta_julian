import { createClient } from '@supabase/supabase-js';

const url = 'https://votkgvlsultmgnypgzis.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvdGtndmxzdWx0bWdueXBnemlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MzExNDMsImV4cCI6MjA4NjQwNzE0M30.trZdF5g-mw0YhXrlXxfiAkLIub-9kte8cEXgmfaoELQ';
const supabase = createClient(url, key);

async function testSimplifiedQuery() {
  console.log('Testing properties query without joins...');
  const { data, error } = await supabase
    .from("propiedades")
    .select(`*`)
    .limit(5);

  if (error) {
    console.error('Error fetching properties:', error);
  } else {
    console.log(`Success! Fetched ${data?.length} properties (no joins).`);
  }
}

testSimplifiedQuery();
