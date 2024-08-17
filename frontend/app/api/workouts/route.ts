// app/api/workouts/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import fetchApiData from '../../utils/fetchApiData';
import decodeJwtToken from '../../utils/decodeJwtToken';

interface FetchApiResponse {
  accessToken: string;
  workouts: any[]; // Replace `any[]` with the appropriate type for workouts
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const cookie = cookies().get('accessToken')?.value || '';
  const session = decodeJwtToken(cookie);
  const userId = session?.user_id;

  if (!userId) {
    return NextResponse.json(
      { error: 'Invalid or missing session token.' },
      { status: 401 }
    );
  }

  const data: FetchApiResponse = await fetchApiData(
    'workouts',
    'post',
    {
      Authorization: `Bearer ${cookie}`,
      'Content-Type': 'application/json',
    },
    { user_id: userId }
  );

  // Modify cookies inside the server action (route handler)
  cookies().set('accessToken', data.accessToken);

  return NextResponse.json(data.workouts, { status: 200 });
}
