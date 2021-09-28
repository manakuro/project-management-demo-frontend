import React, { CSSProperties, useEffect, useRef } from 'react'
import { Box } from 'src/components/atoms'
import { useEditorViewContext } from 'src/components/organisms/Editor/Editors/EdiorProvider'
import 'prosemirror-view/style/prosemirror.css'

type Props = {
  style?: CSSProperties
}

export const EditorContent: React.FC<Props> = React.memo<Props>((props) => {
  const { style } = props
  const view = useEditorViewContext()
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const current = ref.current
    if (current && view) {
      if (style) {
        Object.keys(style).map((k: any) => {
          ;(view.dom as HTMLElement).style[k] = (style as any)[k]
        })
      }

      current.appendChild(view.dom)
    }
    return () => {
      if (current && view) {
        current.removeChild(view.dom)
      }
    }
  }, [style, view])

  useEffect(() => {
    setTimeout(() => {
      if (!view?.dom) return
      // Explicitly enable `focus ring` style
      // @see https://github.com/WICG/focus-visible#2-update-your-css
      view.dom.classList.add('focus-visible')
    }, 300)
  }, [view])

  return <Box ref={ref} />
})
