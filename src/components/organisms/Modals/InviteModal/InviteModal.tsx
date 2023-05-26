import React from 'react'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton,
} from 'src/components/organisms/Modal'
import { useInviteModal } from 'src/components/organisms/Modals'
import { Box, Button, Stack, Text, Textarea } from 'src/components/ui/atoms'

type Props = {}

export const InviteModal: React.FC<Props> = () => {
  const { isOpen, onClose } = useInviteModal()

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Invite people to My Workspace</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={6}>
            <Text>
              Your teammates will get an email that gives them access to your
              team.
            </Text>
            <Box>
              <Text fontSize="sm" mb={2}>
                Email addresses
              </Text>
              <Textarea placeholder="name@company.com, name@company.com, …" />
            </Box>
            <Box>
              <Text fontSize="sm" mb={2}>
                Choose a starting project
              </Text>
              <Textarea placeholder="Start typing to add a project" />
            </Box>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" onClick={() => {}} disabled>
            Invite
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
