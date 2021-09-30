import { useEffect, useRef } from 'react'
import { atom, useRecoilState } from 'recoil'

const key = (str: string) =>
  `src/components/organisms/Menus/ProjectTeammateMenu/useProjectTeammateMenuRef/${str}`

const refState = atom<HTMLElement | null>({
  key: key('refState'),
  default: null,
})

export const useProjectTeammateMenuRef = () => {
  const ref = useRef<HTMLElement | null>(null)
  const [state, setState] = useRecoilState(refState)

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
    element: state,
  }
}
