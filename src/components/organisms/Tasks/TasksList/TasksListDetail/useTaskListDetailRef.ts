import { useEffect, useRef } from 'react'
import { atom, useRecoilState } from 'recoil'

const key = (str: string) =>
  `src/components/organisms/Tasks/TasksList/TasksListDetail/useTaskListDetailRef/${str}`

type State = HTMLElement | null

const refState = atom<State>({
  key: key('refState'),
  default: null,
})

export const useTaskDetailListDetailRef = (deps?: any) => {
  const ref = useRef<HTMLElement | null>(null)
  const [state, setState] = useRecoilState(refState)

  useEffect(() => {
    if (ref.current) {
      setState(ref.current)
    }
  }, [setState, deps])

  return {
    ref,
    taskDetailListDetailRef: state,
  }
}
