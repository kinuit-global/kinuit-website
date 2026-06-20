import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { supabaseFetch } from './fetch'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const { pathname } = request.nextUrl
  const isAdminRoute = pathname.startsWith('/admin')
  const isAuthPage = pathname === '/admin/login' || pathname === '/admin/register'

  // Check if any Supabase auth cookies exist
  const hasAuthCookie = request.cookies.getAll().some(cookie => 
    cookie.name.startsWith('sb-') || 
    cookie.name.includes('auth-token')
  )

  // Optimization: If it's a public route and there's no auth cookie, we don't need to do anything.
  if (!isAdminRoute && !hasAuthCookie) {
    return supabaseResponse
  }

  // Optimization: If it's a protected admin route and they don't even have a session cookie,
  // redirect them to login immediately without hitting Supabase.
  if (isAdminRoute && !isAuthPage && !hasAuthCookie) {
    console.log(`[Middleware] No auth cookie found. Quick redirecting to login.`)
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        fetch: supabaseFetch,
      },
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protected routes check
  if (isAdminRoute) {
    if (isAuthPage) {
      if (user) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url))
      }
      return supabaseResponse
    }

    if (!user) {
      console.log(`[Middleware] Unauthorized access attempt to ${pathname}. Redirecting to login.`)
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    // Role check logic can be added here if needed, or in the page components.
    // Let's verify the user profile role if they try to access admin protected routes
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (error) {
      console.error("[Middleware] Profile fetch error:", error)
    }

    // Only strictly block if we specifically know they are NOT an admin.
    // If the profile is missing (null) due to trigger delay or missing tables, we let them pass 
    // for now to prevent getting locked out of the dashboard right after signup.
    if (profile && profile.role !== 'admin') {
      console.log(`[Middleware] User ${user.email} is not admin. Redirecting to home.`)
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
  // creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse
}
