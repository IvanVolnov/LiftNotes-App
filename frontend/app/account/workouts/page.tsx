import decodeJwtToken from '@/app/utils/decodeJwtToken';
import { Container } from '@mui/material';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const getData = async () => {
  const cookiesList = cookies();
  const accessToken = cookiesList.get('accessToken');
  if (!accessToken) redirect('/auth/login');
  const { user_id } = decodeJwtToken(accessToken);

  try {
    const response = await fetch(`${process.env.APP_API_URL}/api/workouts`, {
      method: 'POST',
      cache: 'no-cache',
      headers: new Headers({
        Authorization: `Bearer ${accessToken?.value}`, // TODO add check if there is no token
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({ user_id }),
    });

    if (!response.ok) {
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Expected JSON response but got:', contentType);
      const text = await response.text();
      throw new Error(`Response body:, ${text}`);
    }

    const data = await response.json();
    return data.workouts;
  } catch (error) {
    throw new Error(`Fetch error:, ${error}`);
  }
};

interface Workout {
  workout_id: string;
  workout_name: string;
  workout_description: string;
}

export default async function Workouts() {
  const data: Workout[] = await getData();

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100svh',
      }}
    >
      <h1>Logged in!</h1>

      <div>
        {data?.map((workout) => (
          <div key={workout.workout_id}>
            <h1>{workout.workout_name}</h1>
            <p>{workout.workout_description}</p>
          </div>
        ))}
      </div>

      {/* <NextButton href='/auth/registration' size='small'>
        register
      </NextButton>
      <NextButton href='/auth/login' size='small'>
        login
      </NextButton> */}
    </Container>
  );
}
