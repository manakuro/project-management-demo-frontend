import React, { memo, useCallback, useMemo } from 'react'
import { MenuItemOption } from 'src/components/organisms/Menu'
import {
  MenuSelect,
  MenuSelectButton,
  MenuSelectList,
} from 'src/components/organisms/Menus'
import { useTask } from 'src/store/entities/tasks'
import {
  TASKS_PRIORITY_TYPE_NONE,
  TASKS_PRIORITY_TYPE_HIGH,
  TASKS_PRIORITY_TYPE_LOW,
  TASKS_PRIORITY_TYPE_MEDIUM,
  TasksPriorityTypes,
  findTextByCode,
} from 'src/store/entities/tasksPriorities'

type Props = {
  taskId: string
  onOpened?: () => void
  onClosed?: () => void
}

const ITEMS: {
  value: TasksPriorityTypes
  text: string
}[] = [
  {
    value: TASKS_PRIORITY_TYPE_NONE,
    text: '-',
  },
  {
    value: TASKS_PRIORITY_TYPE_HIGH,
    text: findTextByCode(TASKS_PRIORITY_TYPE_HIGH),
  },
  {
    value: TASKS_PRIORITY_TYPE_MEDIUM,
    text: findTextByCode(TASKS_PRIORITY_TYPE_MEDIUM),
  },
  {
    value: TASKS_PRIORITY_TYPE_LOW,
    text: findTextByCode(TASKS_PRIORITY_TYPE_LOW),
  },
]

export const Menu: React.FC<Props> = memo<Props>((props) => {
  const { taskId, onOpened, onClosed } = props
  const { task, setTask } = useTask(taskId)
  const defaultValue = useMemo(() => task.priority.toString(), [task.priority])

  const handleChange = useCallback(
    async (type: ToString<TasksPriorityTypes>) => {
      await setTask({ priority: Number(type) as TasksPriorityTypes })
    },
    [setTask],
  )

  const items = useMemo(() => ITEMS, [])

  return (
    <MenuSelect<ToString<TasksPriorityTypes>>
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
