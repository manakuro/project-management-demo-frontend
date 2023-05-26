import React, { memo } from 'react'
import { MenuSelectList } from 'src/components/organisms/Menus'
import {
  useTasksTaskSections,
  TaskSection,
  useTasksTaskSectionByTaskId,
} from 'src/components/organisms/Tasks/hooks'
import { MenuItemOption } from 'src/components/ui/organisms/Menu'

type Props = {
  taskId: string
}

export const MenuList: React.FC<Props> = memo<Props>((props) => {
  const { taskSections } = useTasksTaskSections()
  const { taskSection } = useTasksTaskSectionByTaskId(props.taskId)

  return (
    <Component taskSectionId={taskSection.id} taskSections={taskSections} />
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
Component.displayName = 'Component'
MenuList.displayName = 'MenuList'
