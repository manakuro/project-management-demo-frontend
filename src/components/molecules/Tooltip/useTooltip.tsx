import { useEffect } from 'react'
import { useHover } from 'src/hooks/useHover'
import { useDisclosure } from 'src/shared/chakra'

type Props = {
  openDelay?: number
}

export const useTooltip = (props: Props = {}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { ref, isHovering } = useHover()

  useEffect(() => {
    if (isHovering) {
      if (props.openDelay) {
        setTimeout(() => {
          onOpen()
        }, props.openDelay)
        return
      }
      onOpen()
    } else {
      onClose()
    }
  }, [isHovering, onClose, onOpen, props.openDelay])

  return {
    ref,
    isOpen,
  }
}
