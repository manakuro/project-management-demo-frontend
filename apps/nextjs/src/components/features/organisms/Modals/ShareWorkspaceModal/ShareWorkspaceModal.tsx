import {
  Button,
  Container,
  Flex,
  Icon,
  Input,
  Link,
  MoreLink,
} from 'src/components/ui/atoms';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from 'src/components/ui/organisms/Modal';
import { useShareWorkspaceModal } from './useShareWorkspaceModal';

export function ShareWorkspaceModal() {
  const { isOpen, onClose } = useShareWorkspaceModal();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Manage Privacy</ModalHeader>
        <ModalCloseButton />
        <ModalBody mb={4}>
          <Input
            placeholder="name@company.com, name@company.com, …"
            fontSize="sm"
          />
          <Flex
            mt={3}
            border="1px"
            borderColor="gray.200"
            borderRadius="sm"
            p={4}
          >
            <Flex alignItems="center" flex={1}>
              <Icon icon="lockAlt" color="text.muted" />
              <Container fontSize="xs" color="text.muted" ml={0}>
                This view is private to only you. Adding teammates will allow
                them to view, edit, and organize your work. They will only be
                able to see tasks they already have access to. <br />
                <MoreLink>
                  <Link href="https://google.com" isExternal>
                    Learn more
                  </Link>
                </MoreLink>
              </Container>
              <Button colorScheme="teal" onClick={() => {}} size="sm" disabled>
                Invite
              </Button>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
