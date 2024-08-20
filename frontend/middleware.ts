import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import decodeJwtToken from './app/utils/decodeJwtToken';
import fetchApiData from './app/utils/fetchApiData';

// Specify protected and public routes
const protectedPrefix = '/account';
const publicRoutes = ['/auth/login', '/auth/registration', '/'];

export default async function middleware(req: NextRequest) {
  //Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = path.startsWith(protectedPrefix);
  const isPublicRoute = publicRoutes.includes(path);
  let response = NextResponse.next();

  // Decrypt the session from the cookie
  const cookie = cookies().get('accessToken')?.value || '';
  const session = decodeJwtToken(cookie);
  const userId = session?.user_id;
  const tokenExp = session?.exp;

  // Check if the token is expired
  const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
  const isTokenExpired = tokenExp && tokenExp < currentTime;

  // Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !userId) {
    return NextResponse.redirect(new URL('/auth/login', req.nextUrl));
  }

  // check token expiration
  if (isTokenExpired) {
    response = NextResponse.redirect(new URL('/auth/login', req.nextUrl));
    response.cookies.delete('accessToken');
    return response;
  }

  if (userId && !isTokenExpired) {
    // Recieve updated token from backend and add it to response
    const data = await fetchApiData(
      'users/update_token',
      'post',
      {
        Authorization: `Bearer ${cookie}`,
        'Content-Type': 'application/json',
      },
      { access_token: cookie }
    );
    response.cookies.set('accessToken', data.accessToken);
  }

  // Redirect to /workouts if the user is authenticated
  if (
    isPublicRoute &&
    userId &&
    !req.nextUrl.pathname.startsWith('/account/workouts') &&
    !isTokenExpired
  ) {
    return NextResponse.redirect(new URL('/account/workouts', req.nextUrl));
  }

  return response;
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
