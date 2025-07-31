import { useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  onIdTokenChanged,
  signInAnonymously,
} from 'src/shared/firebase/auth';
import { createProvider } from 'src/shared/react/createProvider';

const useValue = () => {
  const [idToken, setIdToken] = useState('');

  useEffect(() => {
    const unsubscribeAuthStateChanged = onAuthStateChanged(async (user) => {
      if (!user) {
        console.log('signInAnonymously!');
        await signInAnonymously();
      }
    });
    const unsubscribeIdTokenChanged = onIdTokenChanged(async (user) => {
      if (!user) return;
      const id = await user.getIdToken();
      setIdToken(id);
    });

    return () => {
      unsubscribeAuthStateChanged();
      unsubscribeIdTokenChanged();
    };
  }, []);

  return {
    idToken,
  };
};
useValue.__PROVIDER__ = 'AuthProvider';
export const { Provider: AuthProvider, useContext: useAuthContext } =
  createProvider(useValue);
