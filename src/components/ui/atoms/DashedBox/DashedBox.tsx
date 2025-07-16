import type React from 'react'
import { Flex, type FlexProps } from 'src/components/ui/atoms'
import { useClickableHoverStyle } from 'src/hooks'
import { forwardRef } from 'src/shared/chakra'

type Props = FlexProps & {
  ref?: React.ForwardedRef<any>
}
export type DashedBoxProps = Props

export const DashedBox: React.FC<Props> = forwardRef<Props, 'div'>(
  (props, ref) => {
    const { clickableHoverLightStyle } = useClickableHoverStyle()

    return (
      <Flex
        border="dashed 2px"
        borderColor="gray.300"
        borderRadius="md"
        p={2}
        color="text.muted"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        ref={ref}
        {...props}
        {...clickableHoverLightStyle}
      />
    )
  },
)
