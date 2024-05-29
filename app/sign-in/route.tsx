import { Button, Link, TextField } from '@mui/material';

export default function SignIn() {
  return (
    <div>
      <h4>Login</h4>
      <TextField id='email' type='email' label='Email' variant='filled' />
      <TextField
        id='password'
        type='password'
        label='password'
        variant='filled'
      />
      <Button size='large' variant='contained'>
        Login to your account
      </Button>
      <div>
        <p>Don’t have an account?</p>
        <Link href='/registration'>REGISTER</Link>
      </div>
      <div>
        <p>Whant to try it first?</p>
        <Link href='/registration'>VIEW DEMO</Link>
      </div>
    </div>
  );
}
