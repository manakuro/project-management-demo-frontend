import React from 'react'
import { Slide } from 'src/components/atoms'
import { Content } from './Content'
import { useTasksListDetail } from './useTasksListDetail'

export const TasksListDetail: React.VFC = () => {
  const { isOpen, onClose, loading } = useTasksListDetail()

  return (
    <Slide
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
      {isOpen && <Content loading={loading} onClose={onClose} />}
    </Slide>
  )
}
