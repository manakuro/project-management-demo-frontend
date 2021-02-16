import React from 'react'
import { Flex, List, Heading } from 'src/components/atoms'
import { PADDING_X } from '../Navigation'
import { Divider } from '../Divider'
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
  AccordionIcon,
} from '@chakra-ui/react'
import { NavListItem as TNavListItem } from '../type'
import { NavListItem } from '../NavListItem'

type Item = {
  title: {
    expanded: string
    shorten: string
  }
  listItems: TNavListItem[]
}

type Props = {
  item: Item
  isExpanded: boolean
}

export const CustomNavList: React.VFC<Props> = ({ item, isExpanded }) => {
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
                  <NavListItem item={listItem} key={i} />
                ))}
              </List>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Flex>
    </>
  )
}
