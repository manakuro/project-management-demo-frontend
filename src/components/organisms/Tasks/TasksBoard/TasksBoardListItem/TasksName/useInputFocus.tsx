import { Dispatch, SetStateAction, useCallback, useState } from 'react'
import { FlexProps } from 'src/components/atoms'

export type UseInputFocus = {
  inputFocused: boolean
  setInputFocused: Dispatch<SetStateAction<boolean>>
  cellStyle?: FlexProps
  onInputFocus: () => void
  onInputBlur: () => void
}
export const useInputFocus = (): UseInputFocus => {
  const [focused, setFocused] = useState(false)
  const [cellStyle, setCellStyle] = useState<FlexProps>()
  const onInputFocus = useCallback(() => {
    setCellStyle({
      borderColor: 'cyan.400',
      _hover: {
        bg: 'white',
      },
    })
    setFocused(true)
  }, [])
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
