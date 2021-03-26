import { useEffect, useRef } from 'react'
import { useHover } from 'src/hooks/useHover'
import { useDisclosure } from 'src/shared/chakra'

export const useTooltip = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const ref = useRef<HTMLElement | null>(null)
  const isHovering = useHover(ref)

  useEffect(() => {
    if (isHovering) {
      onOpen()
    } else {
      onClose()
    }
  }, [isHovering, onClose, onOpen])

  return {
    ref,
    isOpen,
  }
}
