"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function signup(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (password !== confirmPassword) {
    return { success: false, error: "Passwords do not match" };
  }

  const supabase = await createClient();

  // Try to sign up
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`,
    }
  });

  if (error) {
    // If user already exists, try to resend the confirmation email
    if (error.message.includes("User already registered")) {
      const { error: resendError } = await supabase.auth.resend({
        type: 'signup',
        email,
      });
      
      if (resendError) {
        return { success: false, error: "Email already taken and resend failed." };
      }
      
      return { success: true, message: "Account exists but unverified. Verification email resent!" };
    }
    
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function isAuthenticated() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return !!user;
}

export async function updatePassword(formData: FormData) {
  const oldPassword = formData.get("oldPassword") as string;
  const newPassword = formData.get("newPassword") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (newPassword !== confirmPassword) {
    return { success: false, error: "New passwords do not match" };
  }

  const supabase = await createClient();

  // 1. Verify old password by attempting a fresh sign in
  const { data: { user } } = await supabase.auth.getUser();
  if (!user?.email) return { success: false, error: "User not found" };

  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: oldPassword,
  });

  if (signInError) {
    return { success: false, error: "Incorrect current password" };
  }

  // 2. Update to new password
  const { error: updateError } = await supabase.auth.updateUser({
    password: newPassword
  });

  if (updateError) {
    return { success: false, error: updateError.message };
  }

  return { success: true };
}
