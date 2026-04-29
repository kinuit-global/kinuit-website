import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const DATABASE_URL = "postgresql://postgres:Adsiki%402026@db.wchxzlnggiareikmeyev.supabase.co:5432/postgres";

async function checkProfiles() {
  const client = new Client({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    const res = await client.query('SELECT * FROM profiles');
    console.log("Profiles in DB:", JSON.stringify(res.rows, null, 2));
  } catch (error: any) {
    console.error("Error:", error.message);
  } finally {
    await client.end();
  }
}

checkProfiles();
