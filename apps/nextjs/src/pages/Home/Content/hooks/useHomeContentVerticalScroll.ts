import { useCallback, useEffect } from 'react';
import { atom, useRecoilState } from 'recoil';
import { isHTMLElement } from 'src/shared/isHTMLElement';
import { useHomeContentDom } from './useHomeContentDom';

const key = (str: string) =>
  `src/pages/Home/Content/hooks/useHomeContentVerticalScroll/${str}`;

const state = atom<boolean>({
  key: key('state'),
  default: false,
});

type Props = {
  listenOnEvent?: boolean;
};
export const useTasksListContentVerticalScroll = (props?: Props) => {
  const { dom } = useHomeContentDom();
  const [isScrolling, setIsScrolling] = useRecoilState(state);

  const handleScroll = useCallback(
    (event: Event) => {
      if (!isHTMLElement(event.target)) return;
      setIsScrolling(event.target.scrollTop > 0);
    },
    [setIsScrolling],
  );

  useEffect(() => {
    if (!props?.listenOnEvent) return;
    if (!dom) return;

    dom.addEventListener('scroll', handleScroll);

    return () => dom.removeEventListener('scroll', handleScroll);
  }, [handleScroll, props?.listenOnEvent, dom]);

  return {
    isScrolling,
  };
};
