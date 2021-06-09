import { Tab as ChakraTab, TabProps as ChakraTabProps } from '@chakra-ui/react'
import React from 'react'
import { useClickableHoverStyle } from 'src/hooks'
import { forwardRef } from 'src/shared/chakra'

type Props = ChakraTabProps
export type TabProps = Props

export const Tab: React.FC<Props> = forwardRef((props, ref) => {
  const { clickableHoverLightStyle } = useClickableHoverStyle()

  return (
    <ChakraTab
      px={0}
      mr={4}
      mb={0}
      {...clickableHoverLightStyle}
      fontWeight="medium"
      {...props}
      ref={ref}
    />
  )
})
