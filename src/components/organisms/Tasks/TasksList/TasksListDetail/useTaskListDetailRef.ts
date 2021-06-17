import { useEffect, useRef } from 'react'
import { atom, useRecoilState } from 'recoil'

type State = HTMLElement | null

const taskDetailListDetailRefState = atom<State>({
  key: 'taskDetailListDetailRefState',
  default: null,
})

export const useTaskDetailListDetailRef = (deps?: any) => {
  const ref = useRef<HTMLElement | null>(null)
  const [state, setState] = useRecoilState(taskDetailListDetailRefState)

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
    taskDetailListDetailRef: state,
  }
}
