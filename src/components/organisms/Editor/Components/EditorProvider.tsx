import { Node as ProsemirrorNode, Schema } from 'prosemirror-model'
import { EditorState, Plugin } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  ReactNodeViewPortalsProvider,
  useReactNodeViewCreatePortal,
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

export const useEditorView = () => useContext(EditorViewContext)

type Props = {
  doc?: ProsemirrorNode
  schema?: Schema
  plugins?: Plugin[]
}
export const EditorProvider: React.FC<Props> = (props) => {
  return (
    <ReactNodeViewPortalsProvider>
      <Provider {...props} />
    </ReactNodeViewPortalsProvider>
  )
}

const Provider: React.FC<Props> = (props) => {
  const createPortal = useReactNodeViewCreatePortal()
  const [state, setState] = useState(() =>
    EditorState.create({
      doc: props.doc,
      schema: props.doc,
      plugins: props.plugins,
    }),
  )
  const [view, setView] = useState<EditorView | null>(null)

  useEffect(() => {
    setView(
      new EditorView(undefined, {
        state,
        nodeViews: {
          blockquote(node, view, getPos, decorations) {
            return createReactNodeView({
              node,
              view,
              getPos,
              decorations,
              component: Blockquote,
              onCreatePortal: createPortal,
            })
          },
        },
        dispatchTransaction: function (tr) {
          const state = this.state.apply(tr)
          this.updateState(state)
          setState(state)
        },
      }),
    )
    /* eslint react-hooks/exhaustive-deps: off */
  }, [])

  return (
    <EditorStateContext.Provider value={state}>
      <EditorViewContext.Provider value={view}>
        {props.children}
      </EditorViewContext.Provider>
    </EditorStateContext.Provider>
  )
}
