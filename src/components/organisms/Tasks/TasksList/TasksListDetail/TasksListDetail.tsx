import React from 'react'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerContent,
  DrawerHeader,
  TaskDetailBody,
  TaskDetailHeader,
  TaskDetailFooter,
} from 'src/components/organisms'
import { useTasksListDetail } from './useTasksListDetail'
import { Divider } from 'src/components/atoms'

const HEADER_HEIGHT = 72
const TOP = HEADER_HEIGHT

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
      <DrawerContent
        flex={1}
        top={`${TOP}px !important`}
        borderTop="1px"
        borderLeft="1px"
        borderColor="gray.200"
        boxShadow="none"
      >
        <DrawerHeader p={0}>
          <TaskDetailHeader onClose={onClose} loading={loading} />
        </DrawerHeader>
        <Divider />
        <DrawerBody flex={1} display="flex" flexDirection="column" p={0}>
          <TaskDetailBody isMakePublic loading={loading} />
        </DrawerBody>
        <DrawerFooter p={0}>
          <TaskDetailFooter loading={loading} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
