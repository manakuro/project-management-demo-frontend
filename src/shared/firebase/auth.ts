import { getAuth as getAuthFirebase } from 'firebase/auth'
import { firebaseApp } from './app'

export { onAuthStateChanged, signInAnonymously } from 'firebase/auth'

export const getAuth = () => getAuthFirebase(firebaseApp)
