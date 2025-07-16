import type React from 'react'
import { Flex, type FlexProps } from 'src/components/ui/atoms'

type Props = FlexProps

export const Label: React.FC<Props> = (props) => {
  return (
    <Flex
      color="text.muted"
      fontWeight="medium"
      fontSize="xs"
      mb={2}
      {...props}
    />
  )
}
Label.displayName = 'Label'
