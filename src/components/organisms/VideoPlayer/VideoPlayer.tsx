import React from 'react'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from 'src/components/organisms'
import { AspectRatio, Box } from 'src/components/atoms'
import { useVideoPlayer } from './useVideoPlayer'

export const VideoPlayer: React.VFC = () => {
  const { state, onClose } = useVideoPlayer()

  return (
    <Modal isOpen={state.isOpen} onClose={onClose} size="3xl">
      <ModalOverlay />
      <ModalContent>
        <ModalBody p={0}>
          <AspectRatio ratio={16 / 9}>
            <Box w="full">hi</Box>
          </AspectRatio>
        </ModalBody>
        <ModalFooter>footer here</ModalFooter>
      </ModalContent>
    </Modal>
  )
}
