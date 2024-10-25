'use client';
import { createContext, ReactNode, useContext, useState } from 'react';
import extractFormData from '../utils/extractFormData';

interface optimisticContextProps {
  optimisticData: Content[];
  createOptimisticData: (formData: FormData) => void;
  updateOptimisticData: (data: Content[]) => void;
  deleteOptimisticData: (contentToDelete: Content) => void;
  editOptimisticData: (formData: FormData, data: Content) => void;
}

const ContextDefaultValue: optimisticContextProps = {
  optimisticData: [],
  createOptimisticData: () => {},
  updateOptimisticData: () => {},
  deleteOptimisticData: () => {},
  editOptimisticData: () => {},
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

    setOptimisticData((prev) => [...prev, formatedContent]);
  }

  function editOptimisticData(formData: FormData, data: Content) {
    const { name, description } = extractFormData(formData);
    setOptimisticData((prev) =>
      prev.map((el) =>
        el.id === data.id ? { ...el, name, description, optimistic: true } : el
      )
    );
  }

  function deleteOptimisticData(data: Content) {
    setOptimisticData((prev) => prev.filter((el) => el.id !== data.id));
  }

  return (
    <OptimisticLoadingContext.Provider
      value={{
        optimisticData,
        updateOptimisticData,
        createOptimisticData,
        deleteOptimisticData,
        editOptimisticData,
      }}
    >
      {children}
    </OptimisticLoadingContext.Provider>
  );
}

export const useOptimisticContext = () => useContext(OptimisticLoadingContext);
