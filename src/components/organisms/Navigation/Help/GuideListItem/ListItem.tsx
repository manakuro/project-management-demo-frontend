import React from 'react'
import { Flex, Icon, Text } from 'src/components/atoms'
import { transitions } from 'src/styles'
import { Item, PADDING_X } from './GuideListItem'

type Props = {
  item: Item
  onToggle: () => void
}

export const ListItem: React.VFC<Props> = (props) => {
  const { item, onToggle } = props
  const icon = item.done ? item.iconDone : item.icon

  return (
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
  )
}
