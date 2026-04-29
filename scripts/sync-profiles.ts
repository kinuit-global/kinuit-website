import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const DATABASE_URL = "postgresql://postgres:Adsiki%402026@db.wchxzlnggiareikmeyev.supabase.co:5432/postgres";

async function syncProfiles() {
  const client = new Client({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    
    console.log("Fetching users from auth.users...");
    const usersRes = await client.query('SELECT id, email FROM auth.users');
    const users = usersRes.rows;
    
    console.log(`Found ${users.length} users. Syncing to profiles...`);
    
    for (const user of users) {
      await client.query(
        'INSERT INTO public.profiles (id, email, role) VALUES ($1, $2, $3) ON CONFLICT (id) DO NOTHING',
        [user.id, user.email, 'admin']
      );
      console.log(`Synced: ${user.email}`);
    }
    
    console.log("Profiles synced successfully!");
  } catch (error: any) {
    console.error("Error:", error.message);
  } finally {
    await client.end();
  }
}

syncProfiles();
