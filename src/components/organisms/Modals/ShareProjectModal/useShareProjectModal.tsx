import { useCallback } from 'react'
import { atom, useRecoilState } from 'recoil'

const key = (str: string) =>
  `src/components/organisms/Modals/ShareProjectModal/useShareProjectModal/${str}`

const openState = atom({
  key: key('openState'),
  default: false,
})

export const useShareProjectModal = () => {
  const [isOpen, setIsOpen] = useRecoilState(openState)

  const onOpen = useCallback(() => {
    setIsOpen(true)
  }, [setIsOpen])

  const onClose = useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])

  return {
    isOpen,
    onOpen,
    onClose,
  }
}
