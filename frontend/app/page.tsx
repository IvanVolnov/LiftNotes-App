import { Container } from '@mui/material';

const getData = async () => {
  try {
    const response = await fetch(`${process.env.APP_API_URL}/api/v1/users`, {
      cache: 'no-cache',
    });

    if (!response.ok) {
      console.error('Error fetching data:', response.statusText);
      return [];
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Expected JSON response but got:', contentType);
      const text = await response.text();
      console.error('Response body:', text);
      return [];
    }

    const data = await response.json();
    return data.users;
  } catch (error) {
    console.error('Fetch error:', error);
    return [];
  }
};

type User = {
  id: number;
  name: string;
};

export default async function Home() {
  const data: User[] = await getData();

  console.log('Data: ', data);
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100svh',
      }}
    >
      <h1>Entry page</h1>
      <section>
        <div>
          {data?.map((user) => (
            <div key={user.id}>
              <h1>{user.name}</h1>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
