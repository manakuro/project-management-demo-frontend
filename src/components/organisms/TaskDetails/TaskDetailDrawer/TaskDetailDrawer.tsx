import React, { memo, useCallback } from 'react'
import { Slide } from 'src/components/atoms'
import { useTaskDetail } from 'src/components/organisms'
import { Content } from './Content'
import { useTaskDetailDrawer } from './useTaskDetailDrawer'
import { useTaskDetailDrawerRef } from './useTaskDetailDrawerRef'

type Props = {
  backToPage: () => Promise<void>
  skipElement: (e: Event) => boolean
}

export const TaskDetailDrawer: React.VFC<Props> = memo((props) => {
  const { skipElement, backToPage } = props
  const { isOpen, onClose } = useTaskDetailDrawer()
  const { loading } = useTaskDetail()
  const { ref } = useTaskDetailDrawerRef()

  const handleClose = useCallback(async () => {
    await backToPage()
    await onClose()
  }, [backToPage, onClose])

  return (
    <Slide
      ref={ref}
      in={isOpen}
      direction="right"
      transition={{
        enter: { duration: 0.2 },
        exit: { duration: 0.1 },
      }}
      style={{
        width: '42rem',
        minHeight: '100vh',
        height: '100%',
        zIndex: 1400,
        overflowY: 'scroll',
        pointerEvents: 'auto',
      }}
    >
      {isOpen && (
        <Content
          loading={loading}
          onClose={handleClose}
          skipElement={skipElement}
        />
      )}
    </Slide>
  )
})