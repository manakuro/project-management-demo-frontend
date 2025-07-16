import type React from 'react';
import { type SetStateAction, useState } from 'react';
import { createProvider } from 'src/shared/react/createProvider';

type ContextProps = {
  loadingTabContent: boolean;
  setLoadingTabContent: React.Dispatch<SetStateAction<boolean>>;
};

const useValue = (): ContextProps => {
  const [loadingTabContent, setLoadingTabContent] = useState(false);

  return {
    loadingTabContent,
    setLoadingTabContent,
  };
};
useValue.__PROVIDER__ = 'src/pages/Inbox/Provider.tsx';
export const { Provider, useContext: useInboxPageContext } =
  createProvider(useValue);
