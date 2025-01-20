'use client';
import { Button } from '@mui/material';
import { ReactNode } from 'react';
import { useColorModeContext } from '@/app/context/ColorModeContext';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useModalContext } from '@/app/context/ModalContext';
import { transformToContentArray } from '@/app/utils/transformToContent';

interface MyProps {
  children?: ReactNode;
  entity: Entity;
  operation?: Operation;
  exercisesList?: Exercise[];
}

export default function ContentHeaderBtn({
  children,
  entity,
  operation,
  exercisesList,
}: MyProps) {
  const { checkIfDarkMode } = useColorModeContext();
  const checkIfDark = checkIfDarkMode();
  const formattedexercisesList =
    exercisesList &&
    (transformToContentArray(exercisesList) as ExerciseNormalised[]);

  const searchParams = useSearchParams();
  const edit = searchParams.get('edit');
  const router = useRouter();
  const currentPath = usePathname();

  const deleteQueryParam = (key: string) => {
    const params = new URLSearchParams(searchParams);
    params.delete(key);
    router.push(`${currentPath}?${params.toString()}`);
  };

  const { toggleModal } = useModalContext();

  return (
    <Button
      color={checkIfDark ? 'primary' : 'secondary'}
      variant='outlined'
      size={'large'}
      sx={{ textTransform: 'uppercase' }}
      type='button'
      onClick={
        edit
          ? () => {
              deleteQueryParam('edit');
              router.refresh();
            }
          : () =>
              toggleModal(
                entity,
                operation ? operation : 'create',
                undefined,
                undefined,
                undefined,
                exercisesList ? formattedexercisesList : undefined
              )
      }
      disableElevation
    >
      {edit ? 'exit management mode' : children}
    </Button>
  );
}
