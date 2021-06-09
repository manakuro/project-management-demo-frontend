import React, { memo } from 'react'
import { Divider, Flex } from 'src/components/atoms'
import {
  DrawerBody,
  DrawerFooter,
  DrawerContent,
  DrawerHeader,
  TaskDetailBody,
  TaskDetailHeader,
  TaskDetailFooter,
} from 'src/components/organisms'
import { useClickOutside } from 'src/hooks'
import { useTasksListBody } from 'src/pages/MyTasks/List/useTasksListBody'

const HEADER_HEIGHT = 72
const TOP = HEADER_HEIGHT

type Props = {
  onClose: () => void
  loading: boolean
}

export const Content: React.VFC<Props> = memo((props) => {
  const { getTasksListBodyElement } = useTasksListBody()

  const { ref } = useClickOutside(
    () => {
      props.onClose()
    },
    {
      skipElement: (e) =>
        getTasksListBodyElement()?.contains(e.target as Node) ?? false,
    },
  )

  return (
    <DrawerContent
      flex={1}
      top={`${TOP}px !important`}
      borderTop="1px"
      borderLeft="1px"
      borderColor="gray.200"
      boxShadow="none"
    >
      <Flex h="full" w="full" ref={ref} flexDirection="column">
        <DrawerHeader p={0}>
          <TaskDetailHeader onClose={props.onClose} loading={props.loading} />
        </DrawerHeader>
        <Divider />
        <DrawerBody flex={1} display="flex" flexDirection="column" p={0}>
          <TaskDetailBody isMakePublic loading={props.loading} />
        </DrawerBody>
        <DrawerFooter p={0}>
          <TaskDetailFooter loading={props.loading} />
        </DrawerFooter>
      </Flex>
    </DrawerContent>
  )
})
Content.displayName = 'Content'
