import React from 'react'
import {
  Flex,
  Text,
  List,
  ListItem,
  Icon,
  Heading,
  Divider,
  Link,
  Box,
} from 'src/components/UI/atoms'
import { MAX_WIDTH, PADDING_X } from './Navigation'

type Props = {
  isExpanded: boolean
}

export const NavigationMain: React.VFC<Props> = (props) => {
  return (
    <Box overflow="scroll" flex={1} w={MAX_WIDTH}>
      <Divider color="gray.400" opacity={0.15} />
      <Flex flexDirection="column">
        <Heading as="h4" size="xs" color="text.muted" px={PADDING_X} py={4}>
          {props.isExpanded ? 'Favorites' : 'Fav'}
        </Heading>
        <List mb={2}>
          <ListItem>
            <Link
              display="flex"
              alignItems="center"
              px={PADDING_X}
              py={2}
              _hover={{
                bg: 'navigation.hover',
              }}
              cursor="pointer"
            >
              <Icon icon="idCard" mr={PADDING_X} mt="-2px" />
              <Text fontSize="sm">Engineering</Text>
            </Link>
          </ListItem>
          <ListItem>
            <Link
              display="flex"
              alignItems="center"
              px={PADDING_X}
              py={2}
              _hover={{
                bg: 'navigation.hover',
              }}
              cursor="pointer"
            >
              <Icon icon="gridAlt" mr={PADDING_X} mt="-2px" />
              <Text fontSize="sm">All Items</Text>
            </Link>
          </ListItem>
          <ListItem>
            <Link
              display="flex"
              alignItems="center"
              px={PADDING_X}
              py={2}
              _hover={{
                bg: 'navigation.hover',
              }}
              cursor="pointer"
            >
              <Icon icon="trashAlt" mr={PADDING_X} mt="-2px" />
              <Text fontSize="sm">Deleted Items</Text>
            </Link>
          </ListItem>
        </List>
      </Flex>
      <Divider color="gray.400" opacity={0.15} />
      <Flex flexDirection="column">
        <Heading as="h4" size="xs" color="text.muted" px={PADDING_X} py={4}>
          {props.isExpanded ? 'Reports' : 'Re'}
        </Heading>
        <List mb={2}>
          <ListItem>
            <Link
              display="flex"
              alignItems="center"
              px={PADDING_X}
              py={2}
              _hover={{
                bg: 'navigation.hover',
              }}
              cursor="pointer"
            >
              <Icon icon="task" mr={PADDING_X} mt="-2px" />
              <Text fontSize="sm">Tasks I've changed</Text>
            </Link>
          </ListItem>
        </List>
      </Flex>
    </Box>
  )
}
