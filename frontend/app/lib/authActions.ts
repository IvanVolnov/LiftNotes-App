'use server';
import { cookies } from 'next/headers';
import fetchApiData from '../utils/fetchApiData';
import { validateEmail } from '../utils/validateFormData';
import { redirect } from 'next/navigation';
import decodeJwtToken from '../utils/decodeJwtToken';

export interface User {
  user_id?: string;
  login?: string;
  email: string;
  password: string;
}

export async function login(prevState: any, formData: FormData) {
  const email = formData.get('email') as string | null;
  const password = formData.get('password') as string | null;

  const user = {
    email: email ? email.trim() : '',
    password: password || '',
  };

  if (!user.password || !validateEmail(user.email)) {
    return { message: `Error: Invalid email or password` };
  }
  try {
    const data = await fetchApiData(
      'users/login',
      'post',
      {
        'Content-Type': 'application/json',
      },
      user
    );

    const newSession = decodeJwtToken(data.accessToken);
    const expirationDate = new Date((newSession?.exp || 0) * 1000);

    cookies().set('accessToken', data.accessToken, {
      expires: expirationDate,
      httpOnly: true,
    });
  } catch (error) {
    return { message: String(error) };
  }
  redirect('/account/workouts');
}

export async function register(prevState: any, formData: FormData) {
  const email = formData.get('email') as string | null;
  const password = formData.get('password') as string | null;
  const confirmPassword = formData.get('confirmPassword') as string | null;

  const errors = [];

  const user = {
    email: email ? email.trim() : '',
    password: password || '',
  };

  if (!validateEmail(user.email)) {
    errors.push(`Invalid email`);
  }

  if (user.password !== confirmPassword) {
    errors.push(`Passwords do not match`);
  }

  const passwordStrongnessRegex = /^.{4,}$/;

  if (!passwordStrongnessRegex.test(user.password)) {
    errors.push('Password must be at least 4 characters long');
  }

  if (errors.length) {
    return {
      message: `Register form validation error:
       ${errors.join('; ')}`,
    };
  }

  try {
    const data = await fetchApiData(
      'users/register',
      'post',
      {
        'Content-Type': 'application/json',
      },
      user
    );
  } catch (error) {
    return { message: String(error) };
  }

  redirect('/auth/success');
}

export async function logout() {
  cookies().delete('accessToken');
  redirect('/');
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
