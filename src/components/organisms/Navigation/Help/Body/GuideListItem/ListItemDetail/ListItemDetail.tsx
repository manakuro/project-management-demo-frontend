import React, { useCallback } from 'react'
import {
  AspectRatio,
  Box,
  Button,
  Flex,
  Icon,
  Text,
} from 'src/components/atoms'
import {
  PADDING_X,
  Item,
} from 'src/components/organisms/Navigation/Help/Body/GuideListItem'
import { useVideoPlayer } from 'src/components/organisms/VideoPlayer'
import { useDisclosure } from '@chakra-ui/react'

type Props = {
  item: Item
  onToggle: (id: number) => void
  detailComponent: React.ReactNode
  nextItem?: Item
}

export const ListItemDetail: React.VFC<Props> = (props) => {
  const { item, onToggle, nextItem, detailComponent } = props
  const { setIsOpen, setSrc } = useVideoPlayer()
  const disclosure = useDisclosure()

  const handleOpenVideoPlayer = useCallback(() => {
    setSrc(item.src)
    setIsOpen(true)
  }, [item.src, setIsOpen, setSrc])

  const handleToggle = useCallback(() => {
    onToggle(item.id)
  }, [item.id, onToggle])

  const handleContinue = useCallback(() => {
    onToggle(nextItem!.id)
  }, [nextItem, onToggle])

  return (
    <Flex
      flexDirection="column"
      borderRadius="md"
      minH="340px"
      color="gray.700"
      bg="help.guide.bg"
    >
      <Flex
        w="full"
        px={PADDING_X}
        py={2}
        onClick={handleToggle}
        cursor="pointer"
      >
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
        onClick={handleOpenVideoPlayer}
      >
        <Flex
          bg="gray.200"
          w="full"
          justifyContent="center"
          alignItems="center"
        >
          <Icon icon="playCircle" w={16} h={16} />
        </Flex>
      </AspectRatio>
      <Flex p={PADDING_X} flexDirection="column">
        {disclosure.isOpen ? (
          <>
            {detailComponent}
            {nextItem && (
              <>
                <Text fontSize="sm" fontWeight="bold" mt={3}>
                  Up next:{' '}
                  <Text as="span" fontSize="sm">
                    {nextItem?.title}
                  </Text>
                </Text>
                <Button
                  fontSize="sm"
                  colorScheme="teal"
                  w="full"
                  onClick={handleContinue}
                  mt={3}
                >
                  Continue
                </Button>
              </>
            )}
          </>
        ) : (
          <>
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
                onClick={disclosure.onOpen}
              >
                See more
              </Text>
            </Box>
            <Text fontSize="xs" color="text.muted" mt={2} textAlign="right">
              {item.time}
            </Text>
          </>
        )}
      </Flex>
    </Flex>
  )
}
