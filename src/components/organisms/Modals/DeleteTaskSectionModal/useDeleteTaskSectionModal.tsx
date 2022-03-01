import { useCallback, useMemo } from 'react'
import { atom, useRecoilState, useResetRecoilState } from 'recoil'
import { useToast } from 'src/hooks'
import { useTasksByTaskSectionId } from 'src/store/entities/task'
import { useTaskSection } from 'src/store/entities/taskSection'

const key = (str: string) =>
  `src/components/organisms/Modals/DeleteTaskSectionModal/useDeleteTaskSectionModal/${str}`

const openState = atom({
  key: key('openState'),
  default: false,
})

type ModalState = {
  taskSectionId: string
  deleteTaskSectionAndKeepTasks: (id: string) => Promise<void>
  deleteTaskSectionAndDeleteTasks: (id: string) => Promise<void>
}
const modalState = atom<ModalState>({
  key: key('modalState'),
  default: {
    taskSectionId: '',
    deleteTaskSectionAndKeepTasks: async () => {},
    deleteTaskSectionAndDeleteTasks: async () => {},
  },
})

export const useDeleteTaskSectionModal = () => {
  const [isOpen, setIsOpen] = useRecoilState(openState)
  const [state, setState] = useRecoilState(modalState)
  const resetState = useResetRecoilState(modalState)
  const { taskSection } = useTaskSection(state.taskSectionId)
  const { tasks } = useTasksByTaskSectionId(state.taskSectionId)
  const { toast } = useToast()

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

  const setModalState = useCallback(
    (val: ModalState) => {
      setState(val)
    },
    [setState],
  )

  const handleDeleteAndKeepTaskUndo = useCallback(() => {}, [])

  const onDeleteAndKeepTask = useCallback(async () => {
    setIsOpen(false)
    await state.deleteTaskSectionAndKeepTasks(state.taskSectionId)
    toast({
      description: `${taskSection.name} was deleted and its tasks are being moved.`,
      undo: handleDeleteAndKeepTaskUndo,
      duration: 10000,
    })
    resetState()
  }, [
    resetState,
    setIsOpen,
    state,
    taskSection.name,
    toast,
    handleDeleteAndKeepTaskUndo,
  ])

  const handleDeleteAndDeleteTasksUndo = useCallback(() => {}, [])

  const onDeleteAndDeleteTask = useCallback(async () => {
    setIsOpen(false)
    await state.deleteTaskSectionAndDeleteTasks(state.taskSectionId)
    toast({
      description: `${taskSection.name} was deleted and its tasks are being deleted.`,
      undo: handleDeleteAndDeleteTasksUndo,
      duration: 10000,
    })
    resetState()
  }, [
    handleDeleteAndDeleteTasksUndo,
    resetState,
    setIsOpen,
    state,
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
    inCompletedTaskSize,
    completedTaskSize,
    taskSize,
    ...state,
  }
}
