import { cookies } from 'next/headers';
import fetchApiData from '../utils/fetchApiData';
import { validateEmail } from '../utils/validateFormData';

export interface User {
  user_id?: string;
  login?: string;
  email: string;
  password: string;
}

export async function login(formData: FormData) {
  const email = formData.get('email') as string | null;
  const password = formData.get('password') as string | null;

  const user = {
    email: email ? email.trim() : '',
    password: password || '',
  };

  if (!user.password || !validateEmail(user.email)) {
    throw new Error(`Invalid email or password`);
  }

  const data = await fetchApiData(
    'users/login',
    'post',
    {
      'Content-Type': 'application/json',
    },
    user
  );
  cookies().set('accessToken', data.accessToken);

  return data;
}

export async function register(formData: FormData) {
  const email = formData.get('email') as string | null;
  const password = formData.get('password') as string | null;
  const confirmPassword = formData.get('confirmPassword') as string | null;

  const errors = [];

  const user = {
    email: email ? email.trim() : '',
    password: password || '',
  };

  if (user.password !== confirmPassword) {
    errors.push(`Passwords do not match`);
  }

  if (!validateEmail(user.email)) {
    errors.push(`Invalid email`);
  }

  const passwordStrongnessRegex = /^.{4,}$/;

  if (!passwordStrongnessRegex.test(user.password)) {
    errors.push('Password must be at least 4 characters long');
  }

  if (errors.length) {
    throw new Error(`Register form validation error:\n ${errors.join('\n')}`);
  }

  const data = await fetchApiData(
    'users/register',
    'post',
    {
      'Content-Type': 'application/json',
    },
    user
  );
  console.log(data);
  return data;
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
