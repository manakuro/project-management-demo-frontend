import React, { useEffect, useRef } from 'react'
import { Box, BoxProps } from 'src/components/atoms'
import { useEditorView } from 'src/components/organisms/Editor/Editors/EdiorProvider'
import 'prosemirror-view/style/prosemirror.css'

// import { useTaskDetailBody } from 'src/components/organisms/TaskDetail/TaskDetailBody/useTaskDetailBody'

type Props = BoxProps
export const EditorContent: React.FC<Props> = React.memo<Props>((props) => {
  const view = useEditorView()
  const ref = useRef<HTMLDivElement | null>(null)
  // const { taskDetailBodyDom } = useTaskDetailBody()

  useEffect(() => {
    const current = ref.current
    if (current && view) {
      current.appendChild(view.dom)
    }
    return () => {
      if (current && view) {
        current.removeChild(view.dom)
      }
    }
  }, [view])

  useEffect(() => {
    setTimeout(() => {
      if (!view?.dom) return
      // Explicitly enable `focus ring` style
      // @see https://github.com/WICG/focus-visible#2-update-your-css
      view.dom.classList.add('focus-visible')
    }, 300)
  }, [view])

  // TODO: Find a workaround to make tool bar sticky at bottom
  // const handleKeyDown = useCallback(
  //   (e: React.KeyboardEvent) => {
  //     if (e.code === 'Enter') {
  //       if (!taskDetailBodyDom) return
  //       taskDetailBodyDom.scrollTop += 50
  //     }
  //   },
  //   [taskDetailBodyDom],
  // )

  return <Box {...props} ref={ref} />
})
