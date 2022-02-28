import React, { useCallback } from 'react'
import {
  Button,
  Flex,
  Stack,
  Text,
  Radio,
  RadioGroup,
  Divider,
} from 'src/components/atoms'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton,
} from 'src/components/organisms/Modal'
import { useDeleteTaskSectionModal } from './useDeleteTaskSectionModal'

export const DeleteTaskSectionModal: React.VFC<Props> = () => {
  const { isOpen } = useDeleteTaskSectionModal()

  if (!isOpen) return null

  return <Component />
}

type Props = {}
export const Component: React.VFC<Props> = () => {
  const {
    isOpen,
    onClose,
    taskSection,
    onDeleteAndDeleteTask,
    onDeleteAndKeepTask,
    inCompletedTaskSize,
    completedTaskSize,
    taskSize,
  } = useDeleteTaskSectionModal()
  const [value, setValue] = React.useState('1')

  const handleDelete = useCallback(async () => {
    if (value === '1') {
      await onDeleteAndKeepTask()
      return
    }

    await onDeleteAndDeleteTask()
  }, [onDeleteAndDeleteTask, onDeleteAndKeepTask, value])

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Are you sure you want to delete this section?</ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody>
          <Stack spacing={6}>
            <Text>
              This section{' '}
              <Text as="span" fontWeight="bold">
                {taskSection.name}
              </Text>{' '}
              includes {completedTaskSize} completed tasks and{' '}
              {inCompletedTaskSize} incomplete tasks.
            </Text>
            <Flex flexDirection="column">
              <RadioGroup onChange={setValue} value={value}>
                <Stack>
                  <Radio value="1">
                    Delete this section and keep this {taskSize} task
                  </Radio>
                  <Radio value="2">
                    Delete this section and delete this {taskSize} task
                  </Radio>
                </Stack>
              </RadioGroup>
            </Flex>
          </Stack>
        </ModalBody>
        <Divider />
        <ModalFooter>
          <Button onClick={onClose}>Cancel</Button>
          <Button ml={2} colorScheme="red" onClick={handleDelete}>
            Delete section
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
