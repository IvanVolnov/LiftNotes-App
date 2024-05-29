import Image from 'next/image';
import ButtonUsage from '@/components/ButtonUsage';
import SignIn from './sign-in/route';

export default function Home() {
  return (
    <main>
      <SignIn />
    </main>
  );
}
