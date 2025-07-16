import { useEffect } from 'react';
import { useMountedRef } from 'src/hooks';
import { useHover } from 'src/hooks/useHover';
import { useDisclosure } from 'src/shared/chakra';

type Props = {
  openDelay?: number;
};

export const useTooltip = (props: Props = {}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { ref, isHovering } = useHover();
  const { mountedRef } = useMountedRef();

  useEffect(() => {
    if (isHovering) {
      if (props.openDelay) {
        setTimeout(() => {
          if (mountedRef.current) {
            onOpen();
          }
        }, props.openDelay);
        return;
      }
      onOpen();
    } else {
      onClose();
    }
  }, [isHovering, mountedRef, onClose, onOpen, props.openDelay]);

  return {
    ref,
    isOpen,
    onClose,
    onOpen,
  };
};
