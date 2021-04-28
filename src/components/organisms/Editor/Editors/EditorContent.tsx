import React, { useCallback, useEffect, useRef } from 'react'
import { Box } from 'src/components/atoms'
import { useEditorView } from 'src/components/organisms/Editor/Editors/EdiorProvider'
import { useTaskDetailBody } from 'src/components/organisms/TaskDetail/TaskDetailBody/useTaskDetailBody'

type Props = {}
export const EditorContent: React.FC<Props> = React.memo<Props>(() => {
  const view = useEditorView()
  const ref = useRef<HTMLDivElement | null>(null)
  const { taskDetailBodyDom } = useTaskDetailBody()

  useEffect(() => {
    if (ref.current && view) {
      ref.current.appendChild(view.dom)
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

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.code === 'Enter') {
        if (!taskDetailBodyDom) return
        taskDetailBodyDom.scrollTop += 50
      }
    },
    [taskDetailBodyDom],
  )

  return <Box mb={4} onKeyDown={handleKeyDown} ref={ref} />
})
EditorContent.displayName = 'Editor'
