import React from 'react'
import { MenuButton } from 'src/components/organisms/Menu'
import { Button as AtomsButton } from 'src/components/ui/atoms'
import { forwardRef } from 'src/shared/chakra'

type Props = {}

export const Button: React.FCWithChildren<Props> = forwardRef((props, ref) => {
  return (
    <MenuButton
      ref={ref}
      cursor="pointer"
      as={AtomsButton}
      variant="ghost"
      size="sm"
      border="1px"
      borderColor="transparent"
      px={2}
      h="56px"
      w="full"
    >
      {props.children}
    </MenuButton>
  )
})
Button.displayName = 'Button'
