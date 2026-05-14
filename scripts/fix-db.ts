import { Client } from 'pg';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const connectionString = process.env.DATABASE_URL;

async function fixDatabase() {
  if (!connectionString) {
    console.error('DATABASE_URL not found in .env');
    return;
  }

  const client = new Client({
    connectionString: connectionString,
  });

  try {
    await client.connect();
    console.log('Connected to database');

    const checkColumnQuery = `
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'testimonials' AND column_name = 'show_on_website';
    `;

    const res = await client.query(checkColumnQuery);

    if (res.rows.length === 0) {
      console.log('Column show_on_website not found. Adding it...');
      await client.query('ALTER TABLE testimonials ADD COLUMN show_on_website BOOLEAN DEFAULT FALSE;');
      console.log('Column added successfully');
    } else {
      console.log('Column show_on_website already exists');
    }

  } catch (err) {
    console.error('Error fixing database:', err);
  } finally {
    await client.end();
  }
}

fixDatabase();
