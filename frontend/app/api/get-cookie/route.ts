import { cookies } from 'next/headers';

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const cookieName = searchParams.get('cookieName');

  if (!cookieName) {
    return new Response(JSON.stringify({ error: 'Cookie name is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const cookieStore = cookies();
  const cookieValue = cookieStore.get(cookieName)?.value || null;

  return new Response(JSON.stringify({ value: cookieValue }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
