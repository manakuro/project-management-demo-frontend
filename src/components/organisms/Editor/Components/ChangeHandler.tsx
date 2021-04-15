import { ProsemirrorTransformer } from 'src/shared/prosemirror/transformers'
import { PropsWithChildren, ReactElement, useEffect } from 'react'

import { useEditorState } from './EditorProvider'
import { useDebounce } from 'src/hooks'

type Props<P> = {
  onChange: (value: P) => void
  transformer: ProsemirrorTransformer<P>
  debounce?: number
}
export const ChangeHandler = <P extends unknown>({
  onChange,
  transformer,
  debounce = 0,
}: PropsWithChildren<Props<P>>): ReactElement | null => {
  const state = useEditorState()

  const debouncedDoc = useDebounce(state.doc, debounce)

  useEffect(() => {
    onChange(transformer.serialize(debouncedDoc))
  }, [onChange, transformer, debouncedDoc])

  return null
}
