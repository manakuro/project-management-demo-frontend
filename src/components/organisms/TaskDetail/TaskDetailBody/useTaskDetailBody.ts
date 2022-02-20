import { useEffect, useRef } from 'react'
import { atom, useRecoilState } from 'recoil'

const key = (str: string) =>
  `src/components/organisms/TaskDetail/TaskDetailBody/useTaskDetailBody/${str}`

type State = HTMLElement | null

const refState = atom<State>({
  key: key('refState'),
  default: null,
})

export const useTaskDetailBody = (deps?: any) => {
  const ref = useRef<HTMLElement | null>(null)
  const [state, setState] = useRecoilState(refState)

  useEffect(() => {
    if (ref.current) {
      setState(ref.current)
    }
  }, [setState, deps])

  return {
    ref,
    taskDetailBodyDom: state,
  }
}
