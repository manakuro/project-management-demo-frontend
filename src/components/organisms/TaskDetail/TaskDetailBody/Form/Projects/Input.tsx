import React, { memo } from 'react'
import {
  Flex,
  Input as AtomsInput,
  InputProps,
  Portal,
} from 'src/components/atoms'
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuListProps,
} from 'src/components/organisms/Menu'
import { useClickOutside } from 'src/hooks'
import { useProjects } from 'src/store/entities/projects'

type Props = {
  onClickOutside?: () => void
  menuListStyle?: MenuListProps
} & InputProps

export const Input: React.FC<Props> = memo<Props>((props) => {
  const { onClickOutside, menuListStyle, ...rest } = props
  const { ref } = useClickOutside(() => {
    onClickOutside?.()
  })
  const { projects } = useProjects()

  return (
    <Flex flexDirection="column">
      <AtomsInput
        ref={ref}
        fontSize="sm"
        placeholder="Add to a Project"
        variant="outline"
        size="sm"
        border="1px"
        borderColor="gray.400"
        w="full"
        _focus={{
          border: 'gray.400',
        }}
        _hover={{
          border: 'gray.400',
        }}
        {...rest}
      />
      <Menu defaultIsOpen isLazy closeOnBlur={false} closeOnSelect={false}>
        <MenuButton />
        <Portal>
          <MenuList
            {...{
              w: '450px',
              mt: -2,
              ...menuListStyle,
            }}
            borderTop="none"
          >
            {projects.map((p) => (
              <MenuItem key={p.id}>{p.name}</MenuItem>
            ))}
          </MenuList>
        </Portal>
      </Menu>
    </Flex>
  )
})
Input.displayName = 'Input'
