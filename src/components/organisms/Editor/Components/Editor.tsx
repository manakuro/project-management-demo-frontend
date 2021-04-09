import React, { useCallback, useEffect } from 'react'
import { useEditorView } from './EditorProvider'

type Props = { autoFocus?: boolean }
export const Editor: React.FC<Props> = React.memo<Props>(
  ({ autoFocus = false }) => {
    const view = useEditorView()

    const editorRef = useCallback(
      (element: HTMLDivElement | null) => {
        if (element) {
          element.appendChild(view.dom)
        }
      },
      [view],
    )

    useEffect(() => {
      setTimeout(() => {
        if (!view.dom) return
        // Explicitly enable `focus ring` style
        // @see https://github.com/WICG/focus-visible#2-update-your-css
        view.dom.classList.add('focus-visible')
      }, 300)
    }, [view])

    useEffect(() => {
      if (autoFocus) {
        view.focus()
      }
    }, [autoFocus, view])

    return <div ref={editorRef} className="prosemirror-editor" />
  },
)
Editor.displayName = 'Editor'
