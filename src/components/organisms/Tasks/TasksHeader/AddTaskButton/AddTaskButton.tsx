import React, { memo } from 'react'
import {
  ButtonGroup,
  ButtonGroupProps,
  Button,
  IconButton,
  Icon,
  Portal,
} from 'src/components/atoms'
import { Menu, MenuButton, MenuItem, MenuList } from 'src/components/organisms'

type Props = ButtonGroupProps & {
  onAddTask: () => void
}

export const AddTaskButton: React.VFC<Props> = memo<Props>((props) => {
  const { onAddTask, ...rest } = props

  return (
    <ButtonGroup size="xs" isAttached variant="outline" {...rest}>
      <Button
        mr="-px"
        borderRightRadius="none"
        leftIcon={<Icon icon="plus" color="text.muted" />}
        onClick={onAddTask}
      >
        Add task
      </Button>
      <Menu placement="bottom-start">
        <MenuButton
          borderLeftRadius="none"
          aria-label="Add to task"
          h="auto"
          as={IconButton}
          icon={<Icon icon="chevronDown" color="text.muted" />}
        />
        <Portal>
          <MenuList color="text.base">
            <MenuItem command="Tab + N">Add section</MenuItem>
            <MenuItem>Add milestone</MenuItem>
          </MenuList>
        </Portal>
      </Menu>
    </ButtonGroup>
  )
})
