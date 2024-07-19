import { Container } from '@mui/material';

const getData = async () => {
  try {
    const users = await fetch('http://localhost:5000/api/v1/users', {
      cache: 'no-cache',
    });
    const data = await users.json();
    return data.users;
  } catch (error) {
    throw error;
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
