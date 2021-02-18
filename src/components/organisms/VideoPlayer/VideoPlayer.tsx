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
import { Duration } from './Duration'
import ReactPlayer from 'react-player'
import { DurationBar } from 'src/components/organisms/VideoPlayer/DurationBar'

export type State = {
  played: number
  playing: boolean
  duration: number
  seeking: boolean
}
const initialState = (): State => ({
  played: 0,
  playing: false,
  duration: 0,
  seeking: false,
})

export const VideoPlayer: React.VFC = () => {
  const { state, onClose } = useVideoPlayer()
  const [videoState, setVideoState] = useState<State>(initialState())
  const ref = useRef<ReactPlayer>(null)

  const handlePlay = useCallback(() => {
    setVideoState((s) => ({ ...s, playing: !videoState.playing }))
  }, [videoState.playing])

  const handleProgress = useCallback(
    (state: {
      played: number
      playedSeconds: number
      loaded: number
      loadedSeconds: number
    }) => {
      if (videoState.seeking) return
      setVideoState((s) => ({ ...s, played: state.played }))
    },
    [videoState.seeking],
  )

  const handleDuration = useCallback((duration) => {
    setVideoState((s) => ({ ...s, duration }))
  }, [])

  const seekTo = useCallback(
    (amount: number, type?: 'seconds' | 'fraction') => {
      ref.current?.seekTo(amount, type)
    },
    [ref],
  )

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
                playing={videoState.playing}
                onProgress={handleProgress}
                onDuration={handleDuration}
              />
            </Box>
          </AspectRatio>
        </ModalBody>
        <ModalFooter px={4} py={2} justifyContent="flex-start">
          <Flex flex={1}>
            <IconBg
              borderRadius="50%"
              bg="gray.100"
              w={10}
              h={10}
              _hover={{
                bg: 'gray.200',
              }}
              mr={4}
              onClick={handlePlay}
            >
              <Icon
                icon={videoState.playing ? 'pause' : 'play'}
                mr={videoState.playing ? 0 : -1}
              />
            </IconBg>

            <Duration seconds={videoState.duration * videoState.played} />

            <Flex flex={1}>
              <DurationBar
                played={videoState.played}
                seekTo={seekTo}
                setVideoState={setVideoState}
              />
            </Flex>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
