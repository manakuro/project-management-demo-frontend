import React, { memo } from 'react'
import { EditorContainer } from './Editors'
import { schema, plugins } from 'src/shared/prosemirror/config'
import { EditorProps } from 'prosemirror-view'

type Props = {
  onChange?: (val: string) => void
  value: string
  forceUpdate?: string
} & EditorProps

export const Editor: React.FC<Props> = memo<Props>((props) => {
  return (
    <EditorContainer
      onChange={props.onChange}
      {...props}
      debounce={500}
      schema={schema}
      plugins={plugins()}
      value={props.value}
    >
      {props.children}
    </EditorContainer>
  )
})
