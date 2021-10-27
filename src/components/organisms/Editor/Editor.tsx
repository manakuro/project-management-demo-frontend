import { EditorProps } from 'prosemirror-view'
import React, { memo } from 'react'
import { schema, plugins } from 'src/shared/prosemirror/config'
import { EditorContainer } from './Editors'

type Props = {
  onChange?: (val: string) => void
  initialValue: string
  forceUpdate?: () => string
} & EditorProps

const pluginsProp = plugins()
export const Editor: React.FC<Props> = memo<Props>((props) => {
  return (
    <EditorContainer
      onChange={props.onChange}
      {...props}
      debounce={500}
      schema={schema}
      plugins={pluginsProp}
      initialValue={props.initialValue}
    >
      {props.children}
    </EditorContainer>
  )
})
Editor.displayName = 'Editor'
