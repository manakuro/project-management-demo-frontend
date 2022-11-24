import React, { memo, PropsWithChildren, useCallback } from 'react'
import { MenuItemOption } from 'src/components/organisms/Menu'
import {
  MenuSelect,
  MenuSelectButton,
  MenuSelectList,
} from 'src/components/organisms/Menus'
import { useTask } from 'src/store/entities/task'
import { useTasksPriorities } from 'src/store/entities/taskPriority'

type Props = PropsWithChildren<{
  taskId: string
  onOpened?: () => void
  onClosed?: () => void
}>

export const Menu: React.FC<Props> = memo<Props>((props) => {
  const { taskId, onOpened, onClosed } = props
  const { task, setTask } = useTask(taskId)
  const defaultValue = task.taskPriorityId
  const { taskPriorities } = useTasksPriorities()

  const handleChange = useCallback(
    async (taskPriorityId: string) => {
      await setTask({ taskPriorityId })
    },
    [setTask],
  )

  return (
    <MenuSelect<string>
      onChange={handleChange}
      placement="bottom-end"
      onOpened={onOpened}
      onClosed={onClosed}
    >
      <MenuSelectButton flex={1} h="full">
        {props.children}
      </MenuSelectButton>
      <MenuSelectList defaultValue={defaultValue}>
        {taskPriorities.map((t) => (
          <MenuItemOption value={t.id} key={t.id}>
            {t.name}
          </MenuItemOption>
        ))}
      </MenuSelectList>
    </MenuSelect>
  )
})
Menu.displayName = 'Menu'
