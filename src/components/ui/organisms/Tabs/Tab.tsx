import {
  Tab as ChakraTab,
  type TabProps as ChakraTabProps,
} from '@chakra-ui/react'
import type React from 'react'
import { useClickableHoverStyle } from 'src/hooks'
import { forwardRef } from 'src/shared/chakra'

type Props = ChakraTabProps
export type TabProps = Props

export const Tab: React.FC<Props> = forwardRef<Props, 'div'>((props, ref) => {
  const { clickableHoverLightStyle } = useClickableHoverStyle()

  return (
    <ChakraTab
      px={0}
      mr={4}
      mb={0}
      {...(props.isDisabled ? {} : clickableHoverLightStyle)}
      fontWeight="medium"
      {...props}
      ref={ref}
    />
  )
})
