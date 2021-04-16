import { Node as ProsemirrorNode, Schema } from 'prosemirror-model'
import { EditorState, Plugin } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  ReactNodeViewPortalsProvider,
  useReactNodeViewCreatePortal,
} from './ReactNodeViewPortals'
import { createReactNodeView } from './ReactNodeView'
import { Link, Paragraph } from './nodeViews'

const EditorStateContext = createContext<EditorState | null>(null)
const EditorViewContext = createContext<EditorView | null>(null)

export const useEditorState = (): EditorState => {
  const context = useContext(EditorStateContext)
  if (!context)
    throw new Error('useEditorState is only available inside EditorProvider')
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
  const { createPortal, removePortal } = useReactNodeViewCreatePortal()
  const [state, setState] = useState(() =>
    EditorState.create({
      doc: props.doc,
      schema: props.doc,
      plugins: props.plugins,
    }),
  )
  const [view, setView] = useState<EditorView | null>(null)

  useEffect(() => {
    const view = new EditorView(undefined, {
      state,
      nodeViews: {
        link(node, view, getPos, decorations) {
          return createReactNodeView({
            node,
            view,
            getPos,
            decorations,
            component: Link,
            onCreatePortal: createPortal,
            onRemovePortal: removePortal,
          })
        },
        paragraph(node, view, getPos, decorations) {
          console.log('【nodeViews】paragraph!')
          return createReactNodeView({
            node,
            view,
            getPos,
            decorations,
            component: Paragraph,
            onCreatePortal: createPortal,
            onRemovePortal: removePortal,
          })
        },
      },
      dispatchTransaction(tr) {
        const state = view.state.apply(tr)
        view.updateState(state)
        setState(state)
      },
    })
    setView(view)
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
