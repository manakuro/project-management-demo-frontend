import { EditorProps } from 'prosemirror-view'
import React, { memo, useMemo } from 'react'
import { schema, plugins } from 'src/shared/prosemirror/config'
import { EditorContainer } from './Editors'

type Props = {
  initialValue: string
  forceUpdate?: number
  onChange?: (val: string) => void
  resetView?: number
} & EditorProps

export const Editor: React.FC<Props> = memo<Props>((props) => {
  const pluginsProp = useMemo(() => plugins(), [])

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
