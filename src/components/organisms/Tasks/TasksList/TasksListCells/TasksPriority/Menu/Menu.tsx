import React, { memo, useCallback, useMemo } from 'react'
import { MenuItemOption } from 'src/components/organisms/Menu'
import {
  MenuSelect,
  MenuSelectButton,
  MenuSelectList,
} from 'src/components/organisms/Menus'
import { useTask } from 'src/store/entities/tasks'
import {
  TaskPriorityType,
  TaskPriorityTypeValue,
  findTextByCode,
} from 'src/store/entities/tasksPriorities'

type Props = {
  taskId: string
  onOpened?: () => void
  onClosed?: () => void
}

const ITEMS: {
  value: TaskPriorityTypeValue
  text: string
}[] = [
  {
    value: TaskPriorityType.High,
    text: findTextByCode(TaskPriorityType.High),
  },
  {
    value: TaskPriorityType.Medium,
    text: findTextByCode(TaskPriorityType.Medium),
  },
  {
    value: TaskPriorityType.Low,
    text: findTextByCode(TaskPriorityType.Low),
  },
]

export const Menu: React.FC<Props> = memo<Props>((props) => {
  const { taskId, onOpened, onClosed } = props
  const { task, setTaskPriority } = useTask(taskId)
  const defaultValue = useMemo(
    () => task.taskPriority.priorityType?.toString(),
    [task.taskPriority.priorityType],
  )

  const handleChange = useCallback(
    async (type: TaskPriorityTypeValue) => {
      await setTaskPriority({ priorityType: type })
    },
    [setTaskPriority],
  )

  const items = useMemo(() => ITEMS, [])

  return (
    <MenuSelect<TaskPriorityTypeValue>
      onChange={handleChange}
      placement="bottom-end"
      onOpened={onOpened}
      onClosed={onClosed}
    >
      <MenuSelectButton flex={1} h="full">
        {props.children}
      </MenuSelectButton>
      <MenuSelectList defaultValue={defaultValue}>
        {items.map((item, i) => (
          <MenuItemOption value={item.value.toString()} key={i}>
            {item.text}
          </MenuItemOption>
        ))}
      </MenuSelectList>
    </MenuSelect>
  )
})
Menu.displayName = 'Menu'
