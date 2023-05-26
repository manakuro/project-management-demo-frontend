import React, { memo } from 'react'
import { Flex, FlexProps } from 'src/components/ui/atoms'
import { useMenuStyle } from 'src/hooks'

type Props = FlexProps

export const Empty: React.FC<Props> = memo<Props>((props) => {
  const styles = useMenuStyle().item

  return (
    <Flex
      fontSize="sm"
      {...styles}
      color="text.muted"
      pointerEvents="none"
      {...props}
    >
      {props.children}
    </Flex>
  )
})
Empty.displayName = 'Empty'
