import { useEffect, useMemo } from 'react'
import { atom, useRecoilState } from 'recoil'
import { isServer } from 'src/shared/environment'
import { onAuthStateChanged, signInAnonymously } from 'src/shared/firebase/auth'

const key = (str: string) => `src/hooks/useAuth/${str}`

const idTokenState = atom<string>({
  key: key('idTokenState'),
  default: '',
})

let unsubscribe: ReturnType<typeof onAuthStateChanged>
export const useAuth = () => {
  const [idToken, setIdToken] = useRecoilState(idTokenState)

  const isSignedIn = useMemo(() => !!idToken, [idToken])

  useEffect(() => {
    if (isServer()) return

    try {
      unsubscribe = onAuthStateChanged(async (user) => {
        console.log('user: ', user)
        if (!user) {
          await signInAnonymously()
          return
        }

        const id = await user.getIdToken()
        setIdToken(id)
      })
    } catch (err) {
      if (err instanceof Error) {
        console.dir(err)
      }
    }

    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [setIdToken])

  return {
    idToken,
    isSignedIn,
  }
}
