import { useMemo } from 'react';
import { atom, useRecoilValue } from 'recoil';
import { isServer } from 'src/shared/environment';
import {
  onAuthStateChanged,
  onIdTokenChanged,
  signInAnonymously,
} from 'src/shared/firebase/auth';

const key = (str: string) => `src/hooks/useAuth/${str}`;

const idTokenState = atom<string>({
  key: key('idTokenState'),
  default: '',
  effects: [
    ({ setSelf }) => {
      if (isServer()) {
        setSelf('');
        return;
      }
      let resolve: (value: string) => void;

      // Suspense for initial rendering.
      const defaultValue = new Promise<string>((r) => {
        resolve = r;
      });
      setSelf(defaultValue);

      const unsubscribeAuthStateChanged = onAuthStateChanged(async (user) => {
        if (!user) {
          console.log('signInAnonymously!');
          await signInAnonymously();
        }
      });
      const unsubscribeIdTokenChanged = onIdTokenChanged(async (user) => {
        if (!user) return;
        // console.log('onIdTokenChanged has changed!')
        const id = await user.getIdToken();
        resolve(id);
        setSelf(id);
      });

      return () => {
        unsubscribeAuthStateChanged();
        unsubscribeIdTokenChanged();
      };
    },
  ],
});

export const useAuth = () => {
  const idToken = useRecoilValue(idTokenState);
  const isSignedIn = useMemo(() => !!idToken, [idToken]);

  return {
    idToken,
    isSignedIn,
  };
};
