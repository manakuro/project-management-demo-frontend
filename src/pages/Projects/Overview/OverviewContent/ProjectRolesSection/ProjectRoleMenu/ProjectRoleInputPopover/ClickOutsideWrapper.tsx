import React from 'react'
import { Flex } from 'src/components/atoms'
import { useClickOutside } from 'src/hooks'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export const ClickOutsideWrapper: React.FCWithChildren<Props> = (props) => {
  const { onClose, children, isOpen } = props
  const { ref } = useClickOutside(onClose)

  if (!isOpen) return <>{children}</>

  return (
    <Flex flex={1} ref={ref}>
      {children}
    </Flex>
  )
}
ClickOutsideWrapper.displayName = 'ClickOutsideWrapper'
