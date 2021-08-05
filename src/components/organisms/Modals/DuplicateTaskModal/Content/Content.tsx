import React, { memo } from 'react'
import {
  Button,
  Checkbox,
  Divider,
  Flex,
  Input,
  Stack,
} from 'src/components/atoms'
import {
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalCloseButton,
} from 'src/components/organisms'
import { Label } from './Label'

type Props = {}

export const Content: React.VFC<Props> = memo(() => {
  return (
    <ModalContent>
      <ModalHeader>Duplicate Task</ModalHeader>
      <ModalCloseButton />
      <Divider />
      <ModalBody py={4}>
        <Flex flexDirection="column">
          <Label>Task Name</Label>
          <Input value="Duplicate of 1111" fontSize="sm" />
        </Flex>
        <Flex flexDirection="column" mt={6}>
          <Label>Include</Label>
          <Stack spacing={2}>
            <Checkbox defaultIsChecked size="sm">
              Task Description
            </Checkbox>
            <Checkbox defaultIsChecked size="sm">
              Assignee
            </Checkbox>
            <Checkbox defaultIsChecked size="sm">
              Subtasks
            </Checkbox>
            <Checkbox defaultIsChecked size="sm">
              Tags
            </Checkbox>
            <Checkbox size="sm">Collaborators</Checkbox>
            <Checkbox defaultIsChecked size="sm">
              Projects
            </Checkbox>
            <Checkbox size="sm">Due Date</Checkbox>
            <Checkbox size="sm">Parent Task</Checkbox>
          </Stack>
        </Flex>
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="teal" onClick={() => {}} size="sm">
          Create New Task
        </Button>
      </ModalFooter>
    </ModalContent>
  )
})
Content.displayName = 'Content'
