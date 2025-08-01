import { useHover } from '@/hooks/useHover';
import { createProvider } from '@/shared/react/createProvider';
import type React from 'react';

type ContextProps = {
  ref: React.MutableRefObject<HTMLElement | null>;
  isHovering: boolean;
};

const useValue = (): ContextProps => {
  const { ref, isHovering } = useHover();

  return {
    ref,
    isHovering,
  };
};
useValue.__PROVIDER__ =
  '@/components/organisms/Inbox/InboxListItem/Provider.tsx';
export const { Provider, useContext: useInboxListItemContext } =
  createProvider(useValue);
