import type React from 'react'
import { Flex, type FlexProps } from 'src/components/ui/atoms'
import { useClickableHoverStyle } from 'src/hooks'

type Props = FlexProps

export const Container: React.FC<Props> = (props) => {
  const { clickableHoverStyle } = useClickableHoverStyle()

  return (
    <Flex
      w="full"
      borderBottom="1px"
      borderColor="gray.200"
      py={3}
      px={2}
      {...clickableHoverStyle}
      {...props}
    />
  )
}
