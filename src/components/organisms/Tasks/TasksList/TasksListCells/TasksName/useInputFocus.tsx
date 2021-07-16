import { Dispatch, SetStateAction, useCallback, useState } from 'react'
import { useTasksListContext } from 'src/components/organisms/Tasks/TasksList/Provider'
import { TasksListCellProps } from 'src/components/organisms/Tasks/TasksList/TasksListCell'

export type UseInputFocus = {
  inputFocused: boolean
  setInputFocused: Dispatch<SetStateAction<boolean>>
  cellStyle?: TasksListCellProps
  onInputFocus: () => void
  onInputBlur: () => void
}
export const useInputFocus = (): UseInputFocus => {
  const [focused, setFocused] = useState(false)
  const [cellStyle, setCellStyle] = useState<TasksListCellProps>()
  const { stickyStyle } = useTasksListContext()
  console.log('stickyStyle: ', stickyStyle)
  const onInputFocus = useCallback(() => {
    setCellStyle({
      borderColor: 'cyan.400',
      _hover: {
        bg: 'white',
      },
      containerStyle: {
        bg: 'white',
        zIndex: (stickyStyle.zIndex as number) + 1,
      },
    })
    setFocused(true)
  }, [stickyStyle.zIndex])
  const onInputBlur = useCallback(() => {
    setCellStyle({})
    setFocused(false)
  }, [])

  return {
    inputFocused: focused,
    setInputFocused: setFocused,
    cellStyle,
    onInputFocus,
    onInputBlur,
  }
}
