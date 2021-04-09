import { Node as ProsemirrorNode, Schema } from 'prosemirror-model'
import { EditorState, Plugin } from 'prosemirror-state'
import { EditorProps, EditorView } from 'prosemirror-view'
import React, { createContext, useContext, useState } from 'react'

const EditorStateContext = createContext<EditorState | null>(null)
const EditorViewContext = createContext<EditorView | null>(null)

export const useEditorState = (): EditorState => {
  const context = useContext(EditorStateContext)

  if (!context) {
    throw new Error('useEditorState is only available inside EditorProvider')
  }

  return context
}

export const useEditorView = (): EditorView => {
  const context = useContext(EditorViewContext)

  if (!context) {
    throw new Error('useEditorView is only available inside EditorProvider')
  }

  return context
}

export const EditorProvider: React.FC<{
  doc?: ProsemirrorNode
  schema?: Schema
  plugins?: Plugin[]
  editorProps?: EditorProps
}> = ({
  doc,
  schema,
  plugins = [],
  editorProps,
  // handleDocChange,
  children,
}) => {
  const [state, setState] = useState(() => {
    return EditorState.create({ doc, schema, plugins })
  })

  const [view] = useState(
    () =>
      new EditorView(undefined, {
        ...editorProps,
        state,
        dispatchTransaction: function (tr) {
          const state = this.state.apply(tr)
          view.updateState(state)
          setState(state)
        },
      }),
  )
  return (
    <EditorStateContext.Provider value={state}>
      <EditorViewContext.Provider value={view}>
        {children}
      </EditorViewContext.Provider>
    </EditorStateContext.Provider>
  )
}
