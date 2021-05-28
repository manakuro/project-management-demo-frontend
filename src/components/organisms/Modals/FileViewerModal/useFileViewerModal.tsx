import { atom, useRecoilState, useResetRecoilState } from 'recoil'
import { useCallback } from 'react'

const openState = atom({
  key: 'fileViewerOpenState',
  default: false,
})

type State = {
  currentAttachmentId: string
  attachmentIds: string[]
}
const fileViewerState = atom<State>({
  key: 'fileViewerState',
  default: {
    currentAttachmentId: '',
    attachmentIds: [],
  },
})

export const useFileViewerModal = () => {
  const [isOpen, setIsOpen] = useRecoilState(openState)
  const [state, setState] = useRecoilState(fileViewerState)
  const resetState = useResetRecoilState(fileViewerState)

  const onClose = useCallback(() => {
    setIsOpen(false)
    resetState()
  }, [resetState, setIsOpen])

  const onOpen = useCallback(() => {
    setIsOpen(true)
  }, [setIsOpen])

  return {
    isOpen,
    onOpen,
    onClose,
    ...state,
    setState,
  }
}
