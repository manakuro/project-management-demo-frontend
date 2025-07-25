import type React from 'react';
import {
  AspectRatio,
  Box,
  Button,
  Divider,
  Icon,
  Image,
  Portal,
  PortalManager,
  Text,
} from 'src/components/ui/atoms';
import { Flex } from 'src/components/ui/atoms/Flex';
import {
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from 'src/components/ui/organisms/Popover';

type Props = {
  profile: {
    name: string;
    image: string;
    email: string;
  };
};

export const PopoverProfile: React.FCWithChildren<Props> = (props) => {
  return (
    <PortalManager zIndex={1600}>
      <Popover trigger="hover" isLazy>
        <PopoverTrigger>
          <Box as="span" maxW="max-content">
            {props.children}
          </Box>
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
  );
};
