import { cookies } from 'next/headers';
import fetchApiData from '../utils/fetchApiData';

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

  const emailValidationRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
  console.log(user.email, emailValidationRegex.test(user.email));

  if (!user.password || !emailValidationRegex.test(user.email)) {
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
  // cookies().set('refreshToken', data.refreshToken);

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
