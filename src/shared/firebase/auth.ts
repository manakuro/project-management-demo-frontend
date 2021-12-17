import {
  getAuth as getAuthFirebase,
  signInAnonymously as signInAnonymouslyFirebase,
  onAuthStateChanged as onAuthStateChangedFirebase,
} from 'firebase/auth'
import { firebaseApp } from './app'

export const getAuth = () => getAuthFirebase(firebaseApp)

export const signInAnonymously = () => signInAnonymouslyFirebase(getAuth())

export const onAuthStateChanged = (
  nextOrObserver: Parameters<typeof onAuthStateChangedFirebase>[1],
) => {
  return onAuthStateChangedFirebase(getAuth(), nextOrObserver)
}
