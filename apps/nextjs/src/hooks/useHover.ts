import useHoverReactHook from '@react-hook/hover';
import { useRef } from 'react';

export const useHover = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const isHovering = useHoverReactHook(ref);

  return {
    ref,
    isHovering,
  };
};
