import React, { memo, useCallback } from 'react'
import { Flex, Icon as AtomsIcon, Text, TextProps } from 'src/components/atoms'

type Props = {
  size: number
  textStyle?: TextProps
  onClick?: () => void
}

export const Icon: React.VFC<Props> = memo<Props>((props) => {
  const { size, textStyle, onClick } = props

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLElement | SVGElement>) => {
      e.stopPropagation()
      onClick?.()
    },
    [onClick],
  )

  return (
    <Flex alignItems="center" justifyContent="center" onClick={handleClick}>
      <Text fontSize="xs" color="primary" {...textStyle}>
        {size}
      </Text>
      <AtomsIcon icon="messageRounded" color="primary" ml={1} />
    </Flex>
  )
})
Icon.displayName = 'Icon'
