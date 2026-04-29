import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  return NextResponse.json(data);
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const supabase = await createClient();
    const adminClient = createAdminClient();
    
    // Check if caller is admin
    const { data: { user: caller } } = await supabase.auth.getUser();
    if (!caller) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', caller.id).single();
    if (profile?.role !== 'admin') return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const { id, role, password } = body;
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    // Update Role in profiles
    if (role) {
      const { error: roleError } = await supabase.from('profiles').update({ role }).eq('id', id);
      if (roleError) throw roleError;
    }

    // Update Password in auth.users (requires admin client)
    if (password) {
      const { error: authError } = await adminClient.auth.admin.updateUserById(id, { password });
      if (authError) throw authError;
    }
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("API PUT Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const supabase = await createClient();
    const adminClient = createAdminClient();

    // Check if caller is admin
    const { data: { user: caller } } = await supabase.auth.getUser();
    if (!caller) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', caller.id).single();
    if (profile?.role !== 'admin') return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    // Delete user from auth (this will also delete from profiles due to CASCADE)
    const { error } = await adminClient.auth.admin.deleteUser(id);
    if (error) throw error;
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("API DELETE Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
