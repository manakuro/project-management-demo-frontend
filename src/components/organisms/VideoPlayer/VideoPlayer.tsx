import React, { useCallback, useRef, useState } from 'react'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from 'src/components/organisms'
import { AspectRatio, Box, Flex, Icon, IconBg } from 'src/components/atoms'
import { useVideoPlayer } from './useVideoPlayer'
import ReactPlayer from 'react-player'

type State = {
  played: number
  playing: boolean
}
const initialState = (): State => ({
  played: 0,
  playing: false,
})

export const VideoPlayer: React.VFC = () => {
  const { state, onClose } = useVideoPlayer()
  const [videoState, setVideoState] = useState<State>(initialState())
  const ref = useRef<ReactPlayer>(null)

  const handleSeek = useCallback((e) => {
    setVideoState((s) => ({ ...s, played: parseFloat(e.target.value) }))
  }, [])

  const handlePlay = useCallback(() => {
    setVideoState((s) => ({ ...s, playing: !videoState.playing }))
  }, [videoState.playing])

  console.log('videoState: ', videoState)

  return (
    <Modal isOpen={state.isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalBody p={0}>
          <AspectRatio ratio={16 / 9}>
            <Box w="full" borderTopRadius="md">
              <ReactPlayer
                ref={ref}
                url={state.src}
                width="100%"
                height="100%"
                onSeek={handleSeek}
                playing={videoState.playing}
              />
            </Box>
          </AspectRatio>
        </ModalBody>
        <ModalFooter px={4} py={2} justifyContent="flex-start">
          <Flex>
            <IconBg
              borderRadius="50%"
              bg="gray.100"
              w={10}
              h={10}
              _hover={{
                bg: 'gray.200',
              }}
              onClick={handlePlay}
            >
              <Icon
                icon={videoState.playing ? 'pause' : 'play'}
                mr={videoState.playing ? 0 : -1}
              />
            </IconBg>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
