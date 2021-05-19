import React, { memo } from 'react'
import { EditorContainer } from './Editors'
import { schema, plugins } from 'src/shared/prosemirror/config'

type Props = {
  onChange: (val: string) => void
  value: string
}

export const Editor: React.FC<Props> = memo<Props>((props) => {
  return (
    <EditorContainer
      schema={schema}
      plugins={plugins()}
      value={props.value}
      onChange={props.onChange}
      debounce={500}
    >
      {props.children}
    </EditorContainer>
  )
})
