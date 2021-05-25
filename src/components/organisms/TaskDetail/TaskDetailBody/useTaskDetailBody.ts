import { atom, useRecoilState } from 'recoil'
import { useEffect, useRef } from 'react'

type State = HTMLElement | null

const atomState = atom<State>({
  key: 'taskDetailBodyState',
  default: null,
})

export const useTaskDetailBody = (deps?: any) => {
  const ref = useRef<HTMLElement | null>(null)
  const [state, setState] = useRecoilState(atomState)

  useEffect(() => {
    if (ref.current) {
      setState(ref.current)
    }

    return () => {
      setState(null)
    }
  }, [setState, deps])

  return {
    ref,
    taskDetailBodyDom: state,
  }
}
