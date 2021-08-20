import React, { memo } from 'react'
import { Divider } from 'src/components/atoms'
import {
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalContent,
} from 'src/components/organisms/Modal'
import {
  TaskDetailBody,
  TaskDetailHeader,
  TaskDetailFooter,
} from 'src/components/organisms/TaskDetail'

type Props = {
  loading: boolean
  onClose: () => void
}

export const Content: React.VFC<Props> = memo((props) => {
  return (
    <ModalContent minH="670px" maxH="670px">
      <ModalHeader p={0}>
        <TaskDetailHeader
          onClose={props.onClose}
          loading={props.loading}
          mode="modal"
        />
      </ModalHeader>
      <Divider />
      <ModalBody p={0} overflowY="auto">
        <TaskDetailBody isMakePublic loading={props.loading} />
      </ModalBody>
      <ModalFooter p={0}>
        <TaskDetailFooter borderBottomRadius="md" loading={props.loading} />
      </ModalFooter>
    </ModalContent>
  )
})
Content.displayName = 'Content'
