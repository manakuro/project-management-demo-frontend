import { Node as ProsemirrorNode, Schema } from 'prosemirror-model'
import { EditorState, Plugin } from 'prosemirror-state'
import { EditorProps, EditorView } from 'prosemirror-view'
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import {
  ReactNodeViewPortalsProvider,
  useReactNodeViewPortals,
} from './ReactNodeViewPortals'
import { createReactNodeView } from './ReactNodeView'
import { Blockquote } from './nodeViews'

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

type Props = {
  doc?: ProsemirrorNode
  schema?: Schema
  plugins?: Plugin[]
  editorProps?: EditorProps
}
export const EditorProvider: React.FC<Props> = (props) => {
  return (
    <ReactNodeViewPortalsProvider>
      <Provider {...props} />
    </ReactNodeViewPortalsProvider>
  )
}

const Provider: React.FC<Props> = ({
  doc,
  schema,
  plugins = [],
  editorProps,
  children,
}) => {
  const { createPortal } = useReactNodeViewPortals()
  const handleCreatePortal = useCallback(createPortal, [createPortal])
  const [state, setState] = useState(() =>
    EditorState.create({ doc, schema, plugins }),
  )
  const view = useMemo(
    () =>
      new EditorView(undefined, {
        ...editorProps,
        state,
        nodeViews: {
          blockquote(node, view, getPos, decorations) {
            return createReactNodeView({
              node,
              view,
              getPos,
              decorations,
              component: Blockquote,
              onCreatePortal: handleCreatePortal,
            })
          },
        },
        dispatchTransaction: function (tr) {
          const state = this.state.apply(tr)
          view.updateState(state)
          setState(state)
        },
      }),
    [editorProps, handleCreatePortal, state],
  )

  return (
    <EditorStateContext.Provider value={state}>
      <EditorViewContext.Provider value={view}>
        {children}
      </EditorViewContext.Provider>
    </EditorStateContext.Provider>
  )
}
