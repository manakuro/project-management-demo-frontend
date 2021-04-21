import { DOMSerializer, Node } from 'prosemirror-model'
import { Decoration, EditorView, NodeView } from 'prosemirror-view'
import React, { useContext } from 'react'
import { PortalHandlers } from 'src/components/organisms/Editor/Editors/ReactNodeViewPortals'
import {
  entries,
  isDomNodeOutputSpec,
  isElementDomNode,
  isNodeOfType,
  isPlainObject,
  isString,
} from 'src/shared/prosemirror/utils'

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
  contentDOM: NodeView['contentDOM']
  contentDOMWrapper?: HTMLElement | undefined
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
    this.dom = this.node.type.spec.inline
      ? document.createElement('span')
      : document.createElement('div')

    const { contentDOM, wrapper } = this.createContentDom() ?? {}
    this.contentDOM = contentDOM
    this.contentDOMWrapper = wrapper

    if (this.contentDOMWrapper) {
      this.dom.append(this.contentDOMWrapper)
    }
    this.setDomAttributes(this.node, this.dom)
    this.renderPortal()

    return this
  }

  createContentDom() {
    if (this.node.isLeaf) return

    const domSpec = this.node.type.spec.toDOM?.(this.node)
    if (!domSpec) return

    const { contentDOM, dom } = DOMSerializer.renderSpec(document, domSpec)

    let wrapper: HTMLElement
    if (!isElementDomNode(dom)) return

    wrapper = dom
    if (dom === contentDOM) {
      wrapper = document.createElement('span')
      wrapper.classList.add('ProseMirror__contentWrapper')
      wrapper.append(contentDOM)
    }

    return { wrapper, contentDOM }
  }

  renderPortal() {
    const Component: React.FC = (props) => {
      const NodeView = this.component
      return (
        <ReactNodeViewContext.Provider
          value={{
            node: this.node,
            view: this.view,
            getPos: this.getPos,
            decorations: this.decorations,
            text: (this.contentDOM as HTMLElement)?.innerText ?? '',
          }}
        >
          <NodeView {...props} />
        </ReactNodeViewContext.Provider>
      )
    }

    return this.onCreatePortal({ Component, container: this.dom })
  }

  update(node: Node) {
    if (!isNodeOfType({ types: this.node.type, node })) return false
    if (this.node === node) return true

    if (!this.node.sameMarkup(node)) {
      this.setDomAttributes(node, this.dom!)
    }

    this.node = node
    this.renderPortal()

    return true
  }

  setDomAttributes(node: any, element: HTMLElement): void {
    const { toDOM } = this.node.type.spec
    let attributes = node.attrs

    if (toDOM) {
      const domSpec = toDOM(node)

      if (isString(domSpec) || isDomNodeOutputSpec(domSpec)) {
        return
      }

      if (isPlainObject(domSpec[1])) {
        attributes = domSpec[1]
      }
    }

    for (const [attribute, value] of entries(attributes)) {
      element.setAttribute(attribute, value)
    }
  }

  destroy() {
    const dom = this.dom as HTMLElement
    this.onRemovePortal(dom)
    this.dom = undefined
    this.contentDOM = undefined
  }

  ignoreMutation() {
    return true
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