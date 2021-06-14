import React, { memo } from 'react'
import { Divider, Flex } from 'src/components/atoms'
import {
  TaskDetailBody,
  TaskDetailHeader,
  TaskDetailFooter,
} from 'src/components/organisms'
import { useClickOutside, useDrawerStyle } from 'src/hooks'
import { useTasksListBody } from 'src/pages/MyTasks/List/useTasksListBody'

const HEADER_HEIGHT = 71
const TOP = HEADER_HEIGHT

type Props = {
  onClose: () => void
  loading: boolean
}

export const Content: React.VFC<Props> = memo((props) => {
  const { getTasksListBodyElement } = useTasksListBody()
  const { drawerStyle } = useDrawerStyle()
  console.log('drawerStyle: ', drawerStyle)

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
    <Flex
      flex={1}
      top={`${TOP}px !important`}
      left={0}
      position="absolute"
      borderTop="1px"
      borderLeft="1px"
      borderColor="gray.200"
      boxShadow="none"
      w="full"
      maxH={`calc(100vh - ${TOP}px)`}
      h={`calc(100vh - ${TOP}px)`}
      bg="white"
      flexDirection="column"
    >
      <Flex
        flex={1}
        maxH="inherit"
        h="inherit"
        ref={ref}
        flexDirection="column"
      >
        <Flex p={0}>
          <TaskDetailHeader onClose={props.onClose} loading={props.loading} />
        </Flex>
        <Divider />
        <Flex {...drawerStyle.body} display="flex" flexDirection="column" p={0}>
          <TaskDetailBody isMakePublic loading={props.loading} />
        </Flex>
        <Flex p={0}>
          <TaskDetailFooter loading={props.loading} />
        </Flex>
      </Flex>
    </Flex>
  )
})
Content.displayName = 'Content'
