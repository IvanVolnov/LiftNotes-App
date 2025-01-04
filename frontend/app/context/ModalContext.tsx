'use client';
import { createContext, ReactNode, useContext, useState } from 'react';
import ModalBase from '../components/Modal/ModalBase';
import ResultsModalBase from '../components/Modal/ResultsModal/ResultsModalBase';

export interface Mode {
  entity: Entity;
  operation: Operation;
  modeData?: Content | ExerciseNormalised;
  resultData?: Result;
}

interface ModalContextProps {
  isOpened: boolean;
  mode: Mode;
  toggleModal: (
    newEntity?: Entity,
    newOperation?: Operation,
    modeData?: Content | ExerciseNormalised,
    resultData?: Result,
    skipChangeIsOpened?: boolean
  ) => void;
}

const ModalContextDefaultValue: ModalContextProps = {
  isOpened: false,
  mode: { entity: 'workout', operation: 'create' },
  toggleModal: () => {},
};

const ModalContext = createContext<ModalContextProps>(ModalContextDefaultValue);

ModalContext.displayName = 'ModalContext';

export function UseModal() {
  return useContext(ModalContext);
}

interface Props {
  children: ReactNode;
}

export function ModalProvider({ children }: Props) {
  const [isOpened, setIsOpened] = useState(false);
  const [mode, setMode] = useState<Mode>({
    entity: 'workout',
    operation: 'create',
  });

  function toggleModal(
    newEntity?: Entity,
    newOperation?: Operation,
    modeData?: Content | ExerciseNormalised,
    resultData?: Result,
    skipChangeIsOpened?: boolean
  ) {
    if (!skipChangeIsOpened) setIsOpened((prev) => !prev);
    if (newEntity && newOperation) {
      const newMode: Mode = {
        entity: newEntity,
        operation: newOperation,
        modeData,
        resultData,
      };
      setMode(newMode);
    }
  }

  return (
    <ModalContext.Provider value={{ isOpened, mode, toggleModal }}>
      {mode.entity === 'result' ? (
        <ResultsModalBase isOpened={isOpened} />
      ) : (
        <ModalBase isOpened={isOpened} />
      )}
      {children}
    </ModalContext.Provider>
  );
}

export const useModalContext = () => useContext(ModalContext);
