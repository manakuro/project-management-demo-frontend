import type React from 'react'
import { memo } from 'react'
import {
  TaskDetailBody,
  TaskDetailFooter,
  TaskDetailHeader,
} from 'src/components/features/organisms/TaskDetail'
import { Divider } from 'src/components/ui/atoms'
import {
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from 'src/components/ui/organisms/Modal'

type Props = {
  loading: boolean
  onClose: () => void
}

export const Content: React.FC<Props> = memo((props) => {
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
