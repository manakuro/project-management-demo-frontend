import React from 'react'
import { Flex, List, Heading } from 'src/components/atoms'
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
  AccordionIcon,
} from 'src/components/organisms'
import { useNavigation } from 'src/components/organisms/Navigation'
import { Divider } from 'src/components/organisms/Navigation/Divider'
import { NavListItem } from 'src/components/organisms/Navigation/NavListItem'
import { PADDING_X } from 'src/components/organisms/Navigation/Navigation'
import { NavListItem as TNavListItem } from 'src/components/organisms/Navigation/type'

type Item = {
  title: {
    expanded: string
    shorten: string
  }
  listItems: TNavListItem[]
}

type Props = {
  item: Item
}

export const CustomNavList: React.VFC<Props> = ({ item }) => {
  const { isExpanded } = useNavigation()

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
                  <NavListItem item={listItem} key={i} selectedStyle />
                ))}
              </List>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Flex>
    </>
  )
}
