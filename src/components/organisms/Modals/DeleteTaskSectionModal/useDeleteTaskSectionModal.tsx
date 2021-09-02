import { useCallback, useMemo } from 'react'
import { atom, useRecoilState, useResetRecoilState } from 'recoil'
import { useTaskSection } from 'src/store/entities/taskSections'
import { useTasksByTaskSectionId } from 'src/store/entities/tasks'

const deleteTaskSectionModalOpenState = atom({
  key: 'deleteTaskSectionModalOpenState',
  default: false,
})
const deleteTaskSectionModalState = atom({
  key: 'deleteTaskSectionModalState',
  default: {
    taskSectionId: '',
  },
})

export const useDeleteTaskSectionModal = () => {
  const [isOpen, setIsOpen] = useRecoilState(deleteTaskSectionModalOpenState)
  const [state, setState] = useRecoilState(deleteTaskSectionModalState)
  const resetState = useResetRecoilState(deleteTaskSectionModalState)
  const { taskSection } = useTaskSection(state.taskSectionId)
  const { tasks } = useTasksByTaskSectionId(state.taskSectionId)

  const inCompletedTaskSize = useMemo(
    () => tasks.filter((t) => !t.isDone).length,
    [tasks],
  )
  const completedTaskSize = useMemo(
    () => tasks.filter((t) => t.isDone).length,
    [tasks],
  )
  const taskSize = useMemo(() => tasks.length, [tasks])

  const onClose = useCallback(() => {
    setIsOpen(false)
    resetState()
  }, [setIsOpen, resetState])

  const onOpen = useCallback(() => {
    setIsOpen(true)
  }, [setIsOpen])

  const setTaskSectionId = useCallback(
    (taskSectionId: string) => {
      setState((s) => ({ ...s, taskSectionId }))
    },
    [setState],
  )

  const onDelete = useCallback(() => {}, [])

  return {
    isOpen,
    onClose,
    onOpen,
    setTaskSectionId,
    taskSection,
    onDelete,
    inCompletedTaskSize,
    completedTaskSize,
    taskSize,
    ...state,
  }
}
