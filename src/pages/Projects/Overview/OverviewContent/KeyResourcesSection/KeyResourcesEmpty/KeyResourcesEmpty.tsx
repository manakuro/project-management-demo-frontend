import React from 'react'
import { Button, Flex, Heading, Image, Stack } from 'src/components/atoms'

type Props = {}

export const KeyResourcesEmpty: React.FC<Props> = () => {
  return (
    <Flex
      flex={1}
      mt={2}
      border="1px"
      borderStyle="solid"
      borderColor="gray.200"
      borderRadius="md"
      p={4}
      alignItems="center"
      justifyContent="center"
    >
      <Flex minW="160px" minH="160px" w="160px" h="160px">
        <Image w="full" src="/images/key_resources_2.svg" />
      </Flex>
      <Flex ml={4} flexDirection="column">
        <Heading as="h6" size="xs">
          Align your team around a shared vision with a project brief and
          supporting resources.
        </Heading>
        <Stack mt={2} spacing={2} direction="row">
          <Button colorScheme="teal" size="sm">
            Create project brief
          </Button>
          <Button variant="outline" size="sm">
            Add links & files
          </Button>
        </Stack>
      </Flex>
    </Flex>
  )
}
KeyResourcesEmpty.displayName = 'KeyResourcesEmpty'
