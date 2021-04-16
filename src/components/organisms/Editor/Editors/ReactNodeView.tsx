import { Node } from 'prosemirror-model'
import { Decoration, EditorView, NodeView } from 'prosemirror-view'
import React, { useContext, useEffect, useRef } from 'react'
import { PortalHandlers } from 'src/components/organisms/Editor/Editors/ReactNodeViewPortals'

type ReactNodeViewContextProps = {
  node: Node
  view: EditorView
  getPos: TGetPos
  decorations: Decoration[]
  text: string
}

const ReactNodeViewContext = React.createContext<
  Partial<ReactNodeViewContextProps>
>({
  node: undefined,
  view: undefined,
  getPos: undefined,
  decorations: undefined,
  text: '',
})

type TGetPos = boolean | (() => number)

class ReactNodeView implements NodeView {
  componentRef: React.RefObject<HTMLDivElement>
  dom?: HTMLElement
  contentDOM?: HTMLElement
  component: React.FC<any>
  node: Node
  view: EditorView
  getPos: TGetPos
  decorations: Decoration[]
  onCreatePortal: (portal: { Component: any; container: any }) => void
  onRemovePortal: (container: HTMLElement) => void

  constructor(
    node: Node,
    view: EditorView,
    getPos: TGetPos,
    decorations: Decoration[],
    component: React.FC<any>,
    onCreatePortal: PortalHandlers['createPortal'],
    onRemovePortal: PortalHandlers['removePortal'],
  ) {
    this.node = node
    this.view = view
    this.getPos = getPos
    this.decorations = decorations
    this.component = component
    this.componentRef = React.createRef()
    this.onCreatePortal = onCreatePortal
    this.onRemovePortal = onRemovePortal
  }

  init() {
    this.dom = document.createElement('div')
    this.dom.classList.add('ProseMirror__dom')

    if (!this.node.isLeaf) {
      this.contentDOM = document.createElement('span')
      this.contentDOM.classList.add('ProseMirror__contentDOM')
      this.dom.appendChild(this.contentDOM)
    }

    this.renderPortal(this.dom)

    return this
  }

  renderPortal(container: HTMLElement) {
    const Component: React.FC = (props) => {
      const componentRef = useRef<HTMLDivElement>(null)

      useEffect(() => {
        const componentDOM = componentRef.current
        if (!!componentDOM && !!this.contentDOM) {
          if (!this.node.isLeaf) {
            componentDOM.firstChild?.appendChild(this.contentDOM)
          }
        }
      }, [componentRef])

      const NodeView = this.component

      return (
        <div ref={componentRef} className="ProseMirror__reactComponent">
          <ReactNodeViewContext.Provider
            value={{
              node: this.node,
              view: this.view,
              getPos: this.getPos,
              decorations: this.decorations,
              text: this.contentDOM?.innerText ?? '',
            }}
          >
            <NodeView {...props} />
          </ReactNodeViewContext.Provider>
        </div>
      )
    }

    return this.onCreatePortal({ Component, container })
  }

  update(_: Node) {
    return true
  }

  destroy() {
    const dom = this.dom as HTMLElement
    this.onRemovePortal(dom)
    this.dom = undefined
    this.contentDOM = undefined
  }
}

type CreateReactNodeViewProps = {
  component: React.FC<any>
  onCreatePortal: PortalHandlers['createPortal']
  onRemovePortal: PortalHandlers['removePortal']
} & Omit<ReactNodeViewContextProps, 'text'>

export const createReactNodeView = (props: CreateReactNodeViewProps) => {
  const reactNodeView = new ReactNodeView(
    props.node,
    props.view,
    props.getPos,
    props.decorations,
    props.component,
    props.onCreatePortal,
    props.onRemovePortal,
  )
  return reactNodeView.init()
}
export const useReactNodeView = () => useContext(ReactNodeViewContext)
