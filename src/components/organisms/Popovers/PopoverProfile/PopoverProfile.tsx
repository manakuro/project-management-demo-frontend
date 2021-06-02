import React from 'react'
import { Flex } from 'src/components/atoms/Flex'
import {
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from 'src/components/organisms'
import {
  AspectRatio,
  Button,
  Divider,
  Icon,
  Portal,
  Text,
  Link,
  Image,
  PortalManager,
} from 'src/components/atoms'

type Props = {
  profile: {
    name: string
    image: string
    email: string
  }
}

export const PopoverProfile: React.FC<Props> = (props) => {
  return (
    <PortalManager zIndex={1600}>
      <Popover trigger="hover" isLazy>
        <PopoverTrigger>
          <Link>{props.children}</Link>
        </PopoverTrigger>
        <Portal>
          <PopoverContent w={56} border="none">
            <PopoverBody p={0} boxShadow="md" borderRadius="md">
              <AspectRatio ratio={4 / 3}>
                <Flex
                  bg="teal.400"
                  w="full"
                  justifyContent="flex-start"
                  alignItems="flex-end !important"
                  borderTopRadius="md"
                >
                  <Flex
                    w="full"
                    justifyContent="center"
                    position="absolute"
                    bg="teal.400"
                  >
                    <Image
                      src={props.profile.image}
                      w="100%"
                      objectFit="cover"
                    />
                  </Flex>
                  <Text
                    w="full"
                    fontSize="sm"
                    fontWeight="bold"
                    color="white"
                    px={3}
                    py={1}
                    zIndex="docked"
                    bgGradient="linear(to-b, transparent, gray.700)"
                  >
                    {props.profile.name}
                  </Text>
                </Flex>
              </AspectRatio>
              <Flex px={4} py={3} alignItems="center">
                <Icon icon="mailOutline" w={4} h={4} />
                <Text fontSize="xs" ml={3} noOfLines={1}>
                  {props.profile.email}
                </Text>
              </Flex>
              <Divider />
              <Flex px={4} py={3} alignItems="center">
                <Button
                  leftIcon={<Icon icon="messageRoundedDots" w={4} h={4} />}
                  variant="outline"
                  size="xs"
                >
                  Send message
                </Button>
              </Flex>
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
    </PortalManager>
  )
}
