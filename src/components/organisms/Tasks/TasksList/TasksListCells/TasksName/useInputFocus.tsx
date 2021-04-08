import { useCallback, useState } from 'react'
import { FlexProps } from 'src/components/atoms'

export const useInputFocus = () => {
  const [focused, setFocused] = useState(false)
  const [cellStyle, setCellStyle] = useState<FlexProps>()
  const onInputFocus = useCallback(() => {
    setCellStyle({
      bg: 'white',
      borderColor: 'primary',
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