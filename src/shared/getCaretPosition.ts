export const getCaretPosition = (): { x: number; y: number } | null => {
  const sel = window.getSelection()
  const node = sel?.focusNode
  if (!isHTMLElement(node)) return null

  const rect = node.getBoundingClientRect()
  return {
    y: rect.top,
    x: rect.left,
  }
}

const isHTMLElement = (obj: any): obj is HTMLElement =>
  !!obj?.getBoundingClientRect
