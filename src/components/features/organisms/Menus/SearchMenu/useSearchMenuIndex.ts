import { useCallback } from 'react';
import { atom, useRecoilState } from 'recoil';

const key = (str: string) =>
  `src/components/organisms/Menus/SearchMenu/useSearchMenuIndex/${str}`;

type State = {
  selectedIndex: number;
};

const menuState = atom<State>({
  key: key('menuState'),
  default: {
    selectedIndex: 0,
  },
});

export const useSearchMenuIndex = () => {
  const [state, setState] = useRecoilState(menuState);

  const setSelectedIndex = useCallback(
    (val: number) => {
      setState((s) => ({ ...s, selectedIndex: val }));
    },
    [setState],
  );

  return {
    ...state,
    setSelectedIndex,
  };
};
