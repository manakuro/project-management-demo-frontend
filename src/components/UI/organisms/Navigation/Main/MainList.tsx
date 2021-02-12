import React from 'react'
import {
  Flex,
  Text,
  List,
  ListItem as AtomsListItem,
  Icon,
  Heading,
  Link,
  IconType,
} from 'src/components/UI/atoms'
import { PADDING_X } from '../Navigation'
import { Divider } from '../Divider'
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
  AccordionIcon,
} from '@chakra-ui/react'
import { Routes, Pathname } from 'src/router'

type Item = {
  title: {
    expanded: string
    shorten: string
  }
  listItems: ListItem[]
}
type ListItem = {
  name: string
  href: Routes
  icon: IconType
  pathname: Pathname
}

type Props = {
  item: Item
  isExpanded: boolean
}

export const MainList: React.VFC<Props> = ({ item, isExpanded }) => {
  return (
    <>
      <Divider />
      <Flex flexDirection="column">
        <Accordion allowMultiple allowToggle>
          <AccordionItem border="none">
            <AccordionButton px={PADDING_X} py={4}>
              <Heading
                as="h4"
                size="xs"
                color="text.muted"
                flex="1"
                textAlign="left"
              >
                {isExpanded ? item.title.expanded : item.title.shorten}
              </Heading>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel p={0}>
              <List mb={2}>
                {item.listItems.map((listItem, i) => (
                  <AtomsListItem key={`${i}`}>
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
                      <Icon icon={listItem.icon} mr={PADDING_X} mt="-2px" />
                      <Text fontSize="sm">{listItem.name}</Text>
                    </Link>
                  </AtomsListItem>
                ))}
              </List>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Flex>
    </>
  )
}
