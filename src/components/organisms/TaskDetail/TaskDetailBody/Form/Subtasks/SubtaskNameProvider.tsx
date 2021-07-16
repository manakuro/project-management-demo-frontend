import React from 'react'
import { TasksNameProvider } from 'src/components/organisms/Tasks/TasksList/TasksListCells'
import { createProvider } from 'src/shared/react/createProvider'

type ContextProps = {}

type Props = {
  taskId: string
}
export const SubtaskNameProvider: React.FC<Props> = (props) => {
  return (
    <TasksNameProvider taskId={props.taskId}>
      <Provider {...props} />
    </TasksNameProvider>
  )
}

const useValue = (): ContextProps => {
  return {}
}

export const { Provider, useContext: useSubtaskNameContext } =
  createProvider(useValue)
