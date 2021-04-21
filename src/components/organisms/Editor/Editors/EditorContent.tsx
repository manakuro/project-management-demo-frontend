import React, { useCallback, useEffect } from 'react'
import { useEditorView } from './EdiorProvider'

type Props = {}
export const EditorContent: React.FC<Props> = React.memo<Props>(() => {
  const view = useEditorView()

  const editorRef = useCallback(
    (element: HTMLDivElement | null) => {
      if (element && view) {
        element.appendChild(view.dom)
      }
    },
    [view],
  )

  useEffect(() => {
    setTimeout(() => {
      if (!view?.dom) return
      // Explicitly enable `focus ring` style
      // @see https://github.com/WICG/focus-visible#2-update-your-css
      view.dom.classList.add('focus-visible')
    }, 300)
  }, [view])

  return <div ref={editorRef} />
})
EditorContent.displayName = 'Editor'