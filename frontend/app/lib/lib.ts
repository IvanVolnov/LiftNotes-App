import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { GetServerSidePropsContext } from 'next';

export interface User {
  user_id?: string;
  login?: string;
  email: string;
  password: string;
}

export async function login(formData: FormData) {
  // Verify credentials && get the user
  const user = {
    email: formData.get('email'),
    password: formData.get('password')?.toString().trim(),
  };

  if (!user.password) {
    throw new Error(`Invalid email or password`);
  }
  try {
    const response = await fetch(`${process.env.APP_API_URL}/api/users/login`, {
      cache: 'no-cache',
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      credentials: 'include',
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Expected JSON response but got:', contentType);
      const text = await response.text();
      throw new Error(`Response body:, ${text}`);
    }

    const data = await response.json();
    cookies().set('accessToken', data.accessToken);
    cookies().set('refreshToken', data.refreshToken);

    return data;
  } catch (error) {
    throw new Error(`Fetch error:, ${error}`);
  }
}

export async function logout() {
  // Destroy the session
  cookies().set('session', '', { expires: new Date(0) });
}

// export async function updateSession(request: NextRequest) {
//   const session = request.cookies.get('session')?.value;
//   if (!session) return;

//   // Refresh the session so it doesn't expire
//   const parsed = await decrypt(session);
//   parsed.expires = new Date(Date.now() + shortExpiration);
//   const res = NextResponse.next();
//   res.cookies.set({
//     name: 'session',
//     value: await encrypt(parsed),
//     httpOnly: true,
//     expires: parsed.expires,
//   });
//   return res;
// }
