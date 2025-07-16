import { Button as AtomsButton } from 'src/components/ui/atoms'
import { MenuButton } from 'src/components/ui/organisms/Menu'
import { forwardRef } from 'src/shared/chakra'

export const Button = forwardRef(function Button(props, ref) {
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
