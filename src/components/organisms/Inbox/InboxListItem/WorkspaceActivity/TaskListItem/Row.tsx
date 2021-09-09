import React, { memo, useMemo } from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { useClickableHoverStyle } from 'src/hooks'

type Props = FlexProps & {
  isFirst?: boolean
  isLast?: boolean
}

export const Row: React.FC<Props> = memo<Props>((props) => {
  const { isFirst, isLast, ...rest } = props
  const containerStyle = useMemo(
    (): FlexProps => ({
      ...(isFirst ? { borderTopRadius: 'sm' } : {}),
      ...(isLast ? { borderBottomRadius: 'sm' } : {}),
    }),
    [isFirst, isLast],
  )
  const { clickableHoverStyle } = useClickableHoverStyle()

  return (
    <Flex
      flex={1}
      h="36px"
      minH="36px"
      marginBottom="-1px"
      alignItems="center"
      px={2}
      border="1px"
      borderStyle="solid"
      borderColor="gray.200"
      position="relative"
      justifyContent="flex-end"
      {...clickableHoverStyle}
      {...containerStyle}
      {...rest}
    />
  )
})

Row.displayName = 'Row'
