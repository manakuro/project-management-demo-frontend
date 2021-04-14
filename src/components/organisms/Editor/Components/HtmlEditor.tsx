import {
  createJSONTransformer,
  ProsemirrorTransformer,
} from 'src/shared/prosemirror/transformers'
import { Node as ProsemirrorNode, Schema } from 'prosemirror-model'
import { Plugin } from 'prosemirror-state'
import React, { useState } from 'react'

import { ChangeHandler } from './ChangeHandler'
import { EditorProvider } from './EditorProvider'
import { Portals } from './Portals'

type Props = {
  schema: Schema
  plugins: Plugin[]
  value: string
  onChange: (value: string) => void
  debounce?: number
}
export const HtmlEditor: React.FC<Props> = (props) => {
  const [transformer] = useState<ProsemirrorTransformer>(() =>
    createJSONTransformer(props.schema),
  )

  const [initialDoc] = useState<ProsemirrorNode>(() =>
    transformer.parse(props.value),
  )

  return (
    <EditorProvider plugins={props.plugins} doc={initialDoc}>
      <ChangeHandler
        transformer={transformer}
        onChange={props.onChange}
        debounce={props.debounce}
      />
      {props.children}
      <Portals />
    </EditorProvider>
  )
}
