import React from 'react'
import { forwardRef } from 'src/shared/chakra'
import { Flex, FlexProps } from 'src/components/atoms'
import { useClickableHoverStyle } from 'src/hooks'

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