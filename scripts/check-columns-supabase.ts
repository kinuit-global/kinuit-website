import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function checkColumns() {
  if (!supabaseUrl || !supabaseKey) {
    console.error('Supabase URL or Key not found');
    return;
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .limit(1);

  if (error) {
    console.error('Error fetching testimonials:', error);
  } else if (data && data.length > 0) {
    console.log('Columns found in first record:');
    console.log(Object.keys(data[0]));
  } else {
    console.log('No testimonials found to inspect.');
  }
}

checkColumns();
