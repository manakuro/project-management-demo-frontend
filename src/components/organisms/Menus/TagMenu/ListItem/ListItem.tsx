import React, { memo } from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { useMenuStyle } from 'src/hooks'

type Props = FlexProps & {
  index: number
}

export const ListItem: React.FC<Props> = memo<Props>((props) => {
  const styles = useMenuStyle().item

  delete styles._hover

  return (
    <Flex
      _hover={{
        bg: styles._focus.bg,
      }}
      fontSize="sm"
      alignItems="center"
      {...styles}
      {...props}
    />
  )
})
