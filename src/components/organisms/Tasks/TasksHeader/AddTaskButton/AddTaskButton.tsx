import React, { memo } from 'react'
import {
  ButtonGroup,
  ButtonGroupProps,
  Button,
  IconButton,
  Icon,
  Portal,
  Divider,
} from 'src/components/atoms'
import { Menu, MenuButton, MenuItem, MenuList } from 'src/components/organisms'
import { useTasks } from 'src/components/organisms/Tasks/useTasks'
import { ChakraProps } from 'src/shared/chakra'

type Props = ButtonGroupProps & {
  solid?: boolean
  outlined?: boolean
}

export const AddTaskButton: React.VFC<Props> = memo<Props>((props) => {
  const { solid, outlined, ...rest } = props
  const { addTask, addSection } = useTasks()
  const buttonGroupProps: ButtonGroupProps = props.solid
    ? {
        variant: 'solid',
        colorScheme: 'teal',
      }
    : {
        variant: 'outline',
      }
  const iconStyle: ChakraProps = props.solid
    ? {
        color: 'white',
      }
    : {
        color: 'text.muted',
      }

  return (
    <ButtonGroup size="xs" isAttached {...buttonGroupProps} {...rest}>
      <Button
        mr="-px"
        borderRightRadius="none"
        leftIcon={<Icon icon="plus" {...iconStyle} />}
        onClick={addTask}
      >
        Add task
      </Button>
      {props.solid && <Divider orientation="vertical" />}
      <Menu placement="bottom-start">
        <MenuButton
          borderLeftRadius="none"
          aria-label="Add to task"
          h="auto"
          as={IconButton}
          icon={<Icon icon="chevronDown" {...iconStyle} />}
        />
        <Portal>
          <MenuList color="text.base">
            <MenuItem onClick={addSection} command="Tab + N">
              Add section
            </MenuItem>
            <MenuItem>Add milestone</MenuItem>
          </MenuList>
        </Portal>
      </Menu>
    </ButtonGroup>
  )
})
