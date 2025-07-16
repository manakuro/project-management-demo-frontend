import { useEffect, useRef } from 'react';
import { atom, useRecoilState } from 'recoil';

const key = (str: string) =>
  `src/pages/Home/Content/hooks/useHomeContentDom/${str}`;

const refState = atom<HTMLElement | null>({
  key: key('refState'),
  default: null,
});

export const useHomeContentDom = () => {
  const ref = useRef<HTMLElement | null>(null);
  const [dom, setDom] = useRecoilState(refState);

  useEffect(() => {
    if (ref.current) {
      setDom(ref.current);
    }

    return () => {
      setDom(null);
    };
  }, [setDom]);

  return {
    ref,
    dom,
  };
};
