import React, { useCallback } from 'react'
import { useVideoPlayer } from 'src/components/organisms/VideoPlayer'
import { AspectRatio, Flex, Icon } from 'src/components/ui/atoms'

type Props = {
  src?: string
}

export const Background: React.FC<Props> = (props) => {
  const { src } = props
  const { setIsOpen, setSrc } = useVideoPlayer()

  const handleOpenVideoPlayer = useCallback(() => {
    if (!src) return

    setSrc(src)
    setIsOpen(true)
  }, [src, setIsOpen, setSrc])

  return (
    <AspectRatio
      ratio={16 / 9}
      w="full"
      cursor="pointer"
      onClick={handleOpenVideoPlayer}
    >
      <Flex bg="gray.200" w="full" justifyContent="center" alignItems="center">
        {src && <Icon icon="playCircle" w={16} h={16} />}
      </Flex>
    </AspectRatio>
  )
}
