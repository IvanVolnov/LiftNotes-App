import { Container } from '@mui/material';
import NextButton from './components/UI/NextButton';

const getData = async () => {
  try {
    const response = await fetch(`${process.env.APP_API_URL}/`, {
      cache: 'no-cache',
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
    return data;
  } catch (error) {
    throw new Error(`Fetch error:, ${error}`);
  }
};

export default async function Home() {
  const data = await getData();
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

      <div>Message from server: {data.message}</div>
      <NextButton href='/auth/registration' size='small'>
        register
      </NextButton>
      <NextButton href='/auth/login' size='small'>
        login
      </NextButton>
    </Container>
  );
}
