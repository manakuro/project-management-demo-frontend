import React, { memo, useEffect } from 'react'
import {
  Flex,
  Input as AtomsInput,
  InputProps,
  Portal,
} from 'src/components/atoms'
import { useClickOutside } from 'src/hooks'
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuListProps,
} from 'src/components/organisms'
import { useProjects } from 'src/store/projects'

type Props = {
  onClickOutside?: () => void
  menuListStyle?: MenuListProps
} & InputProps

export const Input: React.FC<Props> = memo<Props>((props) => {
  const { ref, hasClickedOutside } = useClickOutside()
  const { projects } = useProjects()
  const { onClickOutside, menuListStyle, ...rest } = props

  useEffect(() => {
    if (hasClickedOutside) {
      onClickOutside?.()
    }
  }, [hasClickedOutside, onClickOutside])

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
