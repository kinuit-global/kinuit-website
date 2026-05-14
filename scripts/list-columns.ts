import { Client } from 'pg';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const connectionString = process.env.DATABASE_URL;

async function listColumns() {
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

    const listColumnsQuery = `
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'testimonials'
      ORDER BY ordinal_position;
    `;

    const res = await client.query(listColumnsQuery);
    console.log('Columns in testimonials table:');
    console.table(res.rows);

  } catch (err) {
    console.error('Error listing columns:', err);
  } finally {
    await client.end();
  }
}

listColumns();
