'use client';
import { createContext, ReactNode, useContext, useState } from 'react';

interface optimisticContextProps {
  optimisticData: Content[];
  createOptimisticData: (content: Content) => void;
  updateOptimisticData: (data: Content[]) => void;
  deleteOptimisticData: () => void;
  copyOptimisticData: () => void;
}

const ContextDefaultValue: optimisticContextProps = {
  optimisticData: [],
  createOptimisticData: () => {},
  updateOptimisticData: () => {},
  deleteOptimisticData: () => {},
  copyOptimisticData: () => {},
};

const OptimisticLoadingContext =
  createContext<optimisticContextProps>(ContextDefaultValue);

OptimisticLoadingContext.displayName = 'OptimisticLoadingContext';

export function UseOptimistic() {
  return useContext(OptimisticLoadingContext);
}

interface Props {
  children: ReactNode;
}

export function OptimisticProvider({ children }: Props) {
  const [optimisticData, setOptimisticData] = useState<Content[]>([]);

  function updateOptimisticData(data: Content[]) {
    console.log('optimistic data updated');
    setOptimisticData(data);
  }

  function createOptimisticData(content: Content) {
    setOptimisticData((prev) => [...prev, content]);
  }

  function copyOptimisticData() {}

  function deleteOptimisticData() {}

  return (
    <OptimisticLoadingContext.Provider
      value={{
        optimisticData,
        updateOptimisticData,
        createOptimisticData,
        deleteOptimisticData,
        copyOptimisticData,
      }}
    >
      {children}
    </OptimisticLoadingContext.Provider>
  );
}

export const useOptimisticContext = () => useContext(OptimisticLoadingContext);
