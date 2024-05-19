'use client';

import {
  PropsWithChildren,
  useContext,
  createContext,
  useState,
  useRef
} from 'react';

type Advice = {
  message: string;
  feedback: string;
};

type GlobalContext = {
  advice: boolean;
  adviceBody: Advice | null;
  showAdvice: (message: string, feedback: string, time?: number) => void;
};

const GlobalContext = createContext<GlobalContext | null>(null);

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (context === null)
    throw new Error('globalContext deve estar dentro do Provider');
  return context;
};

export const GlobalStorage = ({ children }: PropsWithChildren) => {
  const [advice, setAdvice] = useState(false);
  const [adviceBody, setAdviceBody] = useState<Advice | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showAdvice = (
    message: string,
    feedback: string,
    time: number = 2000
  ) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setAdvice(true);
    setAdviceBody({ message, feedback });
    timeoutRef.current = setTimeout(() => {
      setAdvice(false);
      timeoutRef.current = null;
    }, time);
  };

  return (
    <GlobalContext.Provider value={{ advice, adviceBody, showAdvice }}>
      {children}
    </GlobalContext.Provider>
  );
};
