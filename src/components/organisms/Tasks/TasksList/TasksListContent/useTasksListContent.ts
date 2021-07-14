import { useEffect, useRef } from 'react'
import { atom, useRecoilState } from 'recoil'

const taskListContentState = atom<HTMLElement | null>({
  key: 'taskListContentState',
  default: null,
})

export const useTasksListContent = () => {
  const ref = useRef<HTMLElement | null>(null)
  const [state, setState] = useRecoilState(taskListContentState)

  useEffect(() => {
    if (ref.current) {
      setState(ref.current)
    }

    return () => {
      setState(null)
    }
  }, [setState])

  return {
    ref,
    dom: state,
  }
}
