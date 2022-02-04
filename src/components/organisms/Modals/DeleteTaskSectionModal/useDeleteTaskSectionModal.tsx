import { useCallback, useMemo } from 'react'
import { atom, useRecoilState, useResetRecoilState } from 'recoil'
import { useTasksByTaskSectionId } from 'src/store/entities/task'
import { useTaskSection } from 'src/store/entities/taskSection'

const key = (str: string) =>
  `src/components/organisms/Modals/DeleteTaskSectionModal/useDeleteTaskSectionModal/${str}`

const openState = atom({
  key: key('openState'),
  default: false,
})
const modalState = atom({
  key: key('modalState'),
  default: {
    taskSectionId: '',
  },
})

export const useDeleteTaskSectionModal = () => {
  const [isOpen, setIsOpen] = useRecoilState(openState)
  const [state, setState] = useRecoilState(modalState)
  const resetState = useResetRecoilState(modalState)
  const { taskSection } = useTaskSection(state.taskSectionId)
  const { tasks } = useTasksByTaskSectionId(state.taskSectionId)

  const inCompletedTaskSize = useMemo(
    () => tasks.filter((t) => !t.completed).length,
    [tasks],
  )
  const completedTaskSize = useMemo(
    () => tasks.filter((t) => t.completed).length,
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
