'use client';
import { ReactNode } from 'react';
import NextButton from './UI/NextButton';
import { useSearchParams } from 'next/navigation';

interface CustomProps {
  children?: ReactNode;
  id: string;
  mode: 'workout' | 'day' | 'excercise';
}

export default function ContentBlockMenu({ mode, id }: CustomProps) {
  const searchParams = useSearchParams();
  const edit = searchParams.get('edit');

  return edit ? (
    <p>edit mode</p>
  ) : (
    <NextButton variant='contained'>start</NextButton>
  );
}
