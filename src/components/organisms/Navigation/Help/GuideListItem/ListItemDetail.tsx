import React, { useCallback } from 'react'
import { AspectRatio, Box, Flex, Icon, Text } from 'src/components/atoms'
import { PADDING_X, Item } from './GuideListItem'
import { useVideoPlayer } from 'src/components/organisms/VideoPlayer'

type Props = {
  item: Item
  onToggle: () => void
}

export const ListItemDetail: React.VFC<Props> = (props) => {
  const { item, onToggle } = props
  const { setIsOpen, setSrc } = useVideoPlayer()

  const openVideoPlayer = useCallback(() => {
    setSrc(item.src)
    setIsOpen(true)
  }, [item.src, setIsOpen, setSrc])

  return (
    <Flex
      flexDirection="column"
      borderRadius="md"
      minH="340px"
      color="gray.700"
      bg="help.guide.bg"
    >
      <Flex w="full" px={PADDING_X} py={2} onClick={onToggle} cursor="pointer">
        <Flex
          borderRadius="50%"
          bg="gray.800"
          justifyContent="center"
          alignItems="center"
          w="20px"
          h="20px"
          mr={PADDING_X}
          fontSize="xs"
          fontWeight="bold"
          color="white"
        >
          {item.number}
        </Flex>
        <Text fontSize="sm" fontWeight="bold" flex={1}>
          {item.title}
        </Text>
        <Icon icon="chevronDown" />
      </Flex>
      <AspectRatio
        ratio={4 / 3}
        w="full"
        cursor="pointer"
        onClick={openVideoPlayer}
      >
        <Flex
          bg="gray.200"
          w="full"
          justifyContent="center"
          alignItems="center"
        >
          <Icon icon="play" w={16} h={16} />
        </Flex>
      </AspectRatio>
      <Flex p={PADDING_X} flexDirection="column">
        <Text fontSize="sm" isTruncated noOfLines={3}>
          {item.description}
        </Text>
        <Box>
          <Text
            as="span"
            fontSize="xs"
            color="link"
            cursor="pointer"
            _hover={{
              textDecoration: 'underline !important',
            }}
          >
            See more
          </Text>
        </Box>
        <Text fontSize="xs" color="text.muted" mt={2} textAlign="right">
          {item.time}
        </Text>
      </Flex>
    </Flex>
  )
}
