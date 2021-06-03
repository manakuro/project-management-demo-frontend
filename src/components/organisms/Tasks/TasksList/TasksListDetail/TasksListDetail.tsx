import React from 'react'
import { Drawer } from 'src/components/organisms'
import { useTasksListDetail } from './useTasksListDetail'
import { Content } from './Content'

export const TasksListDetail: React.VFC = () => {
  const { isOpen, onClose, loading } = useTasksListDetail()

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      placement="right"
      size="lg"
      variant="alwaysOpen"
      trapFocus={false}
    >
      {isOpen && <Content loading={loading} onClose={onClose} />}
    </Drawer>
  )
}
