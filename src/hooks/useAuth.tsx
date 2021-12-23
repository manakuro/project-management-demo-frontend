import { useEffect, useMemo } from 'react'
import { atom, useRecoilState } from 'recoil'
import { isServer } from 'src/shared/environment'
import {
  onAuthStateChanged,
  onIdTokenChanged,
  signInAnonymously,
} from 'src/shared/firebase/auth'

const key = (str: string) => `src/hooks/useAuth/${str}`

const idTokenState = atom<string>({
  key: key('idTokenState'),
  default: '',
})

export const useAuth = () => {
  const [idToken, setIdToken] = useRecoilState(idTokenState)

  const isSignedIn = useMemo(() => !!idToken, [idToken])

  useEffect(() => {
    if (isServer()) return

    try {
      return onAuthStateChanged(async (user) => {
        if (!user) {
          console.log('signInAnonymously!')
          await signInAnonymously()
        }
      })
    } catch (err) {
      if (err instanceof Error) {
        console.dir(err)
      }
    }
  }, [setIdToken])

  useEffect(() => {
    if (isServer()) return

    try {
      return onIdTokenChanged(async (user) => {
        if (!user) return
        const id = await user.getIdToken()
        setIdToken(id)
      })
    } catch (err) {
      if (err instanceof Error) {
        console.dir(err)
      }
    }
  }, [setIdToken])

  return {
    idToken,
    isSignedIn,
  }
}
