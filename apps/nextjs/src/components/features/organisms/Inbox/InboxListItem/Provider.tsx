import type React from 'react';
import { useHover } from 'src/hooks/useHover';
import { createProvider } from 'src/shared/react/createProvider';

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
  'src/components/organisms/Inbox/InboxListItem/Provider.tsx';
export const { Provider, useContext: useInboxListItemContext } =
  createProvider(useValue);
