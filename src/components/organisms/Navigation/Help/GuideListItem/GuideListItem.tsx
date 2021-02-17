import React from 'react'
import { Flex, Icon, IconType, Text } from 'src/components/atoms'
import { transitions } from 'src/styles'

export type Item = {
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
}
type Props = {
  item: Item
}

const PADDING_X = 4
export const GuideListItem: React.VFC<Props> = (props) => {
  const { item } = props
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
      height="40px"
    >
      <Icon icon={icon.name} color={icon.color} mr={PADDING_X} />
      <Text fontSize="sm" fontWeight="bold" flex={1}>
        {item.title}
      </Text>
      <Icon icon="chevronRight" />
    </Flex>
  )
}
