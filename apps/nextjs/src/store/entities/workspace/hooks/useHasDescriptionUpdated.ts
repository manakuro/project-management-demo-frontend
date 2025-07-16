import { atom, useRecoilState } from 'recoil';

const key = (str: string) =>
  `src/store/entities/workspace/hooks/useHasDescriptionUpdated/${str}`;

const hasDescriptionUpdatedState = atom<number>({
  key: key('hasDescriptionUpdatedState'),
  default: 1,
});

export const useHasDescriptionUpdated = () => {
  const [hasDescriptionUpdated, setHasDescriptionUpdated] = useRecoilState(
    hasDescriptionUpdatedState,
  );

  return {
    hasDescriptionUpdated,
    setHasDescriptionUpdated,
  };
};
