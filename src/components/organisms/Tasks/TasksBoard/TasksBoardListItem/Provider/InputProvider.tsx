import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useRef,
  useState,
} from 'react'
import { FlexProps } from 'src/components/atoms'
import { isHTMLElement } from 'src/shared/isHTMLElement'
import { createProvider } from 'src/shared/react/createProvider'

type ContextProps = {
  ref: React.MutableRefObject<HTMLTextAreaElement | null>
  inputFocused: boolean
  setInputFocused: Dispatch<SetStateAction<boolean>>
  cellStyle?: FlexProps
  onInputFocus: () => void
  onInputBlur: () => void
  onInputSelect: () => void
}

const useValue = (): ContextProps => {
  const ref = useRef<HTMLTextAreaElement | null>(null)
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

  const onInputSelect = useCallback(() => {
    if (!isHTMLElement(ref.current)) return
    ref.current.focus()
    ref.current.select()
  }, [])

  return {
    ref,
    inputFocused: focused,
    setInputFocused: setFocused,
    cellStyle,
    onInputFocus,
    onInputBlur,
    onInputSelect,
  }
}
useValue.__PROVIDER__ =
  'src/components/organisms/Tasks/TasksBoard/TasksBoardListItem/Provider/InputProvider.tsx'
export const { Provider, useContext: useTasksBoardListItemInputContext } =
  createProvider(useValue)
