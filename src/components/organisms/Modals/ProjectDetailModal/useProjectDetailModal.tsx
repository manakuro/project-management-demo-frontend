import { useCallback } from 'react'
import { atom, useRecoilState, useResetRecoilState } from 'recoil'

const key = (str: string) =>
  `src/components/organisms/Modals/ProjectDetailModal/useProjectDetailModal/${str}`

const state = atom({
  key: key('modalState'),
  default: false,
})

const projectIdState = atom<string>({
  key: key('projectIdState'),
  default: '',
})

export const useProjectDetailModal = () => {
  const [isOpen, setIsOpen] = useRecoilState(state)
  const [projectId, setProjectId] = useRecoilState(projectIdState)
  const resetProjectId = useResetRecoilState(projectIdState)

  const onClose = useCallback(() => {
    setIsOpen(false)
    resetProjectId()
  }, [resetProjectId, setIsOpen])

  const onOpen = useCallback(() => {
    setIsOpen(true)
  }, [setIsOpen])

  return {
    isOpen,
    onOpen,
    onClose,
    projectId,
    setProjectId,
  }
}
