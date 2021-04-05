import React, { memo, useEffect } from 'react'
import { Input as AtomsInput, Portal } from 'src/components/atoms'
import { useClickOutside } from 'src/hooks'
import { Menu, MenuButton, MenuItem, MenuList } from 'src/components/organisms'
import { useProjects } from 'src/store/projects'

type Props = {
  onClickOutside: () => void
}

export const Input: React.FC<Props> = memo<Props>((props) => {
  const { ref, hasClickedOutside } = useClickOutside()
  const { projects } = useProjects()

  useEffect(() => {
    if (hasClickedOutside) {
      props.onClickOutside()
    }
  })

  return (
    <>
      <AtomsInput
        ref={ref}
        autoFocus
        variant="unstyled"
        fontSize="sm"
        placeholder="Add to a Project"
        w={60}
      />
      <Menu
        defaultIsOpen
        placement="bottom"
        isLazy
        closeOnBlur={false}
        closeOnSelect={false}
      >
        <MenuButton />
        <Portal>
          <MenuList w="450px" ml="-54px" mt={2}>
            {projects.map((p) => (
              <MenuItem key={p.id}>{p.name}</MenuItem>
            ))}
          </MenuList>
        </Portal>
      </Menu>
    </>
  )
})
