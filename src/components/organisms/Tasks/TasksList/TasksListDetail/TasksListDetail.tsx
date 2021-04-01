import React from 'react'
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  TaskDetailBody,
  TaskDetailHeader,
} from 'src/components/organisms'
import { useTasksListDetail } from './useTasksListDetail'
import { Divider } from 'src/components/atoms'

const HEADER_HEIGHT = 72
const TOP = HEADER_HEIGHT

export const TasksListDetail: React.VFC = () => {
  const { isOpen, onClose } = useTasksListDetail()

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="right" size="lg">
      <DrawerContent
        flex={1}
        top={`${TOP}px !important`}
        borderTop="1px"
        borderLeft="1px"
        borderColor="gray.200"
        boxShadow="none"
      >
        <DrawerHeader p={0}>
          <TaskDetailHeader onClose={onClose} />
        </DrawerHeader>
        <Divider />

        <DrawerBody flex={1} display="flex" flexDirection="column" px={4}>
          <TaskDetailBody />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
