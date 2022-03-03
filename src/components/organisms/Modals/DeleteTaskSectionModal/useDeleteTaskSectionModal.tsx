import { useCallback } from 'react'
import { atom, useRecoilState, useResetRecoilState } from 'recoil'
import {
  useTasksCompletedTaskSizeByTaskSectionId,
  useTasksTaskSection,
  useTasksTaskSectionCommand,
} from 'src/components/organisms/Tasks/hooks'
import { useToast } from 'src/hooks'

const key = (str: string) =>
  `src/components/organisms/Modals/DeleteTaskSectionModal/useDeleteTaskSectionModal/${str}`

const openState = atom({
  key: key('openState'),
  default: false,
})

type ModalState = {
  taskSectionId: string
}
const modalState = atom<ModalState>({
  key: key('modalState'),
  default: {
    taskSectionId: '',
  },
})

export const useDeleteTaskSectionModal = () => {
  const [isOpen, setIsOpen] = useRecoilState(openState)
  const [state, setState] = useRecoilState(modalState)
  const resetState = useResetRecoilState(modalState)
  const { toast } = useToast()
  const { deleteTaskSectionAndDeleteTasks, deleteTaskSectionAndKeepTasks } =
    useTasksTaskSectionCommand()
  const { completedTaskSize, incompleteTaskSize, taskSize } =
    useTasksCompletedTaskSizeByTaskSectionId(state.taskSectionId)
  const { taskSection } = useTasksTaskSection(state.taskSectionId)

  const onClose = useCallback(() => {
    setIsOpen(false)
    resetState()
  }, [setIsOpen, resetState])

  const onOpen = useCallback(() => {
    setIsOpen(true)
  }, [setIsOpen])

  const setModalState = useCallback(
    (val: ModalState) => {
      setState(val)
    },
    [setState],
  )

  const handleDeleteAndKeepTaskUndo = useCallback(() => {}, [])

  const onDeleteAndKeepTask = useCallback(async () => {
    setIsOpen(false)
    await deleteTaskSectionAndKeepTasks(state.taskSectionId)
    toast({
      description: `${taskSection.name} was deleted and its tasks are being moved.`,
      undo: handleDeleteAndKeepTaskUndo,
      duration: 10000,
    })
    resetState()
  }, [
    setIsOpen,
    deleteTaskSectionAndKeepTasks,
    state.taskSectionId,
    toast,
    taskSection.name,
    handleDeleteAndKeepTaskUndo,
    resetState,
  ])

  const handleDeleteAndDeleteTasksUndo = useCallback(() => {}, [])

  const onDeleteAndDeleteTask = useCallback(async () => {
    setIsOpen(false)
    await deleteTaskSectionAndDeleteTasks(state.taskSectionId)
    toast({
      description: `${taskSection.name} was deleted and its tasks are being deleted.`,
      undo: handleDeleteAndDeleteTasksUndo,
      duration: 10000,
    })
    resetState()
  }, [
    deleteTaskSectionAndDeleteTasks,
    handleDeleteAndDeleteTasksUndo,
    resetState,
    setIsOpen,
    state.taskSectionId,
    taskSection.name,
    toast,
  ])

  return {
    isOpen,
    onClose,
    onOpen,
    setModalState,
    taskSection,
    onDeleteAndKeepTask,
    onDeleteAndDeleteTask,
    incompleteTaskSize,
    completedTaskSize,
    taskSize,
    ...state,
  }
}
