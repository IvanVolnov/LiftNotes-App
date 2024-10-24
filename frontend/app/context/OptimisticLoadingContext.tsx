'use client';
import { createContext, ReactNode, useContext, useState } from 'react';
import extractFormData from '../utils/extractFormData';

interface optimisticContextProps {
  optimisticData: Content[];
  createOptimisticData: (formData: FormData) => void;
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
    console.log('optimistic data updated', data);
    setOptimisticData(data);
  }

  function createOptimisticData(formData: FormData) {
    const { name, description } = extractFormData(formData);
    const formatedContent: Content = {
      id: Date.now().toString(),
      name,
      description,
      position: 0,
      created_at: Date(),
      optimistic: true,
    };
    console.log('optimistic data added ', formatedContent);
    setOptimisticData((prev) => [...prev, formatedContent]);
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
