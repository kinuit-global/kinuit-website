import { Client } from 'pg';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

// Use direct Supabase connection URL which works reliably for migrations
const connectionString = "postgresql://postgres:Adsiki%402026@db.wchxzlnggiareikmeyev.supabase.co:5432/postgres";

async function run() {
  const client = new Client({
    connectionString: connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('Connected to database');

    const checkColumnQuery = `
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'case_studies' AND column_name = 'is_featured';
    `;

    const res = await client.query(checkColumnQuery);

    if (res.rows.length === 0) {
      console.log('Column is_featured not found. Adding it...');
      await client.query('ALTER TABLE case_studies ADD COLUMN is_featured BOOLEAN DEFAULT FALSE;');
      console.log('Column added successfully');
    } else {
      console.log('Column is_featured already exists');
    }

  } catch (err) {
    console.error('Error running migration script:', err);
  } finally {
    await client.end();
  }
}

run();
