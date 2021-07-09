import { Dispatch, SetStateAction, useCallback, useState } from 'react'
import { FlexProps } from 'src/components/atoms'
import { useStickyListStyle } from 'src/hooks/styles/useStickyListStyle'

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
  const { stickyStyle } = useStickyListStyle()
  const onInputFocus = useCallback(() => {
    setCellStyle({
      bg: 'white',
      borderColor: 'cyan.400',
      zIndex: (stickyStyle.zIndex as number) + 1,
      _hover: {
        bg: 'white',
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
