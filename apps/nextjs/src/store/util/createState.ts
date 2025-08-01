import { uniqBy } from '@/shared/utils';
import deepEqual from 'fast-deep-equal';
import { type PrimitiveAtom, atom } from 'jotai';
import { RESET, atomFamily, atomWithReset } from 'jotai/utils';

type Props<T> = {
  initialState: () => T;
  set?: (params: { newVal: T }) => void;
};

type State = {
  id: string;
};

export const createState = <T extends State>(props: Props<T>) => {
  const itemFamily = atomFamily<string, PrimitiveAtom<T>>(
    () => atomWithReset(props.initialState()),
    deepEqual,
  );

  const listAtom = atomWithReset<T[]>([]);
  const idsAtom = atomWithReset<string[]>([]);

  const state = atomFamily((id: string) => {
    const itemAtom = itemFamily(id);

    return atom(
      (get) => get(itemAtom),
      (get, set, newVal: T | typeof RESET) => {
        if (newVal === RESET) {
          set(itemAtom, newVal as unknown as T);
          set(listAtom, (prev) => prev.filter((p) => p.id !== id));
          set(idsAtom, (prev) => prev.filter((prevId) => prevId !== id));
          itemFamily.remove(id);
          return;
        }

        set(itemAtom, newVal);
        set(listAtom, (prev) =>
          uniqBy([...prev, newVal], 'id').map((p) =>
            p.id === newVal.id ? { ...p, ...newVal } : p,
          ),
        );

        if (!get(idsAtom).includes(newVal.id)) {
          set(idsAtom, (prev) => [...prev, newVal.id]);
        }

        props.set?.({ newVal });
      },
    );
  }, deepEqual);

  return {
    state,
    listState: listAtom,
    idsState: idsAtom,
  };
};
