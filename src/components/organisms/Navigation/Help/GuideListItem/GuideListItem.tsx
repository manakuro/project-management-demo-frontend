import React from 'react'
import {
  AspectRatio,
  Box,
  Flex,
  Icon,
  IconType,
  Text,
} from 'src/components/atoms'
import { transitions } from 'src/styles'
import { useDisclosure } from '@chakra-ui/react'

export type Item = {
  number: number
  title: string
  src: string
  description: string
  icon: {
    name: IconType
    color: string
  }
  iconDone: {
    name: IconType
    color: string
  }
  done: boolean
  time: string
}
type Props = {
  item: Item
}

const PADDING_X = 4
export const GuideListItem: React.VFC<Props> = (props) => {
  const { isOpen, onToggle } = useDisclosure()

  const { item } = props
  const icon = item.done ? item.iconDone : item.icon

  return (
    <>
      {isOpen ? (
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
            onClick={onToggle}
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
          <AspectRatio ratio={4 / 3} w="full" cursor="pointer">
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
      ) : (
        <Flex
          px={PADDING_X}
          py={2}
          cursor="pointer"
          bg="rgba(255,255,255,.04)"
          border="1px"
          borderColor="navigation.hover"
          borderRadius="md"
          alignItems="center"
          _hover={{
            bg: 'navigation.hover',
          }}
          transition={transitions.base}
          transitionProperty="background"
          height="40px"
          onClick={onToggle}
        >
          <Icon icon={icon.name} color={icon.color} mr={PADDING_X} />
          <Text fontSize="sm" fontWeight="bold" flex={1}>
            {item.title}
          </Text>
          <Icon icon="chevronRight" />
        </Flex>
      )}
    </>
  )
}
