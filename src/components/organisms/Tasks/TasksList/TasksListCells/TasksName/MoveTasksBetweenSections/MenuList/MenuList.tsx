import React, { memo } from 'react'
import { MenuItemOption } from 'src/components/organisms/Menu'
import { MenuSelectList } from 'src/components/organisms/Menus'
import { useTasksTaskSections } from 'src/components/organisms/Tasks/hooks'
import { TaskSection } from 'src/store/entities/taskSections'
import { useTask } from 'src/store/entities/tasks'

type Props = {
  taskId: string
}

export const MenuList: React.FC<Props> = memo<Props>((props) => {
  const { taskSections } = useTasksTaskSections()
  const { task } = useTask(props.taskId)

  return (
    <Component taskSectionId={task.taskSectionId} taskSections={taskSections} />
  )
})

// TODO: Pass `taskSections` instead of `useTaskSection` because MenuItemOption has issue when its wrapped
type ComponentProps = {
  taskSections: TaskSection[]
  taskSectionId: string
}
const Component: React.FC<ComponentProps> = memo<ComponentProps>((props) => {
  return (
    <MenuSelectList defaultValue={props.taskSectionId}>
      {props.taskSections.map((t) => (
        <MenuItemOption value={t.id} key={t.id}>
          {t.name}
        </MenuItemOption>
      ))}
    </MenuSelectList>
  )
})
MenuList.displayName = 'MenuList'
