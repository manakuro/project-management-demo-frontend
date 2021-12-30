import { Node as ProsemirrorNode } from 'prosemirror-model'
import { EditorState, Plugin, TextSelection } from 'prosemirror-state'
import { EditorProps, EditorView } from 'prosemirror-view'
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { createReactNodeView } from './ReactNodeView'
import {
  PortalHandlers,
  ReactNodeViewPortalsProvider,
  useReactNodeViewCreatePortal,
} from './ReactNodeViewPortals'
import { Link, Mention, Emoji } from './nodeViews'

const EditorStateContext = createContext<EditorState | null>(null)
const EditorViewContext = createContext<EditorView | null>(null)

export const useEditorStateContext = (): EditorState => {
  const context = useContext(EditorStateContext)
  if (!context)
    throw new Error('useEditorState is only available inside EditorProvider')
  return context
}

export const useEditorViewContext = () => useContext(EditorViewContext)

type Props = {
  doc?: ProsemirrorNode
  plugins?: Plugin[]
  forceUpdate?: () => string
} & EditorProps
export const EditorProvider: React.FC<Props> = (props) => {
  return (
    <ReactNodeViewPortalsProvider>
      <Provider {...props} />
    </ReactNodeViewPortalsProvider>
  )
}

const generateState = (props: Parameters<typeof EditorState.create>[0]) => {
  return EditorState.create({
    doc: props.doc,
    plugins: props.plugins,
  })
}
const generateView = (
  props: Props & {
    state: EditorState
    createPortal: PortalHandlers['createPortal']
    removePortal: PortalHandlers['removePortal']
    setState: Dispatch<SetStateAction<EditorState>>
  },
) => {
  const view = new EditorView(undefined, {
    state: props.state,
    editable: props.editable,
    nodeViews: {
      link(node, view, getPos, decorations) {
        return createReactNodeView({
          node,
          view,
          getPos,
          decorations,
          component: Link,
          onCreatePortal: props.createPortal,
          onRemovePortal: props.removePortal,
        })
      },
      mention(node, view, getPos, decorations) {
        return createReactNodeView({
          node,
          view,
          getPos,
          decorations,
          component: Mention,
          onCreatePortal: props.createPortal,
          onRemovePortal: props.removePortal,
        })
      },
      emoji(node, view, getPos, decorations) {
        return createReactNodeView({
          node,
          view,
          getPos,
          decorations,
          component: Emoji,
          onCreatePortal: props.createPortal,
          onRemovePortal: props.removePortal,
        })
      },
    },
    dispatchTransaction(tr) {
      const state = view.state.apply(tr)
      view.updateState(state)
      props.setState(state)
    },
  })
  return view
}

const Provider: React.FC<Props> = (props) => {
  const { createPortal, removePortal } = useReactNodeViewCreatePortal()
  const [state, setState] = useState(generateState(props))
  const viewRef = useRef<EditorView | null>(null)

  useEffect(() => {
    const view = viewRef.current
    if (!view) return

    // const newState = generateState({
    //   doc: props.doc,
    //   plugins: view.state.plugins,
    //   selection: view.state.selection,
    //   storedMarks: view.state.storedMarks,
    // })
    // view.state.tr.replace(
    //   0,
    //   view.state.doc.content.size,
    //   new Slice<any>(props.doc?.content!, 0, 0),
    // )
    // setState(newState)
    // view.updateState(newState)
    // const tr = state.tr.replaceWith(
    //   0,
    //   state.doc.content.size,
    //   props.doc?.content!,
    // )
    // view.dispatch(tr)

    // setTimeout(() => {
    //   const shouldUpdate =
    //     view.state.doc.content.size !== props.doc?.content!.size
    //   if (!shouldUpdate) return
    //
    //   const tr = view.state.tr.replaceWith(
    //     0,
    //     view.state.doc.content.size,
    //     props.doc?.content!,
    //   )
    //   view.dispatch(tr)
    //   console.log(
    //     'update view state!! ',
    //     state.doc.content.size,
    //     props.doc?.content!.size,
    //   )
    // })

    console.log('view.state.selection.from: ', view.state.selection.from)

    const tr = view.state.tr.replaceWith(
      0,
      view.state.doc.content.size,
      props.doc?.content!,
    )
    view.dispatch(
      tr.setSelection(
        TextSelection.create(
          tr.doc,
          view.state.selection.anchor,
          view.state.selection.head,
        ),
      ),
    )
  }, [props.doc])

  useEffect(() => {
    viewRef.current = generateView({
      ...props,
      state,
      setState,
      createPortal,
      removePortal,
    })
    /* eslint react-hooks/exhaustive-deps: off */
  }, [props.editable])

  return (
    <EditorStateContext.Provider value={state}>
      <EditorViewContext.Provider value={viewRef.current}>
        {props.children}
      </EditorViewContext.Provider>
    </EditorStateContext.Provider>
  )
}
