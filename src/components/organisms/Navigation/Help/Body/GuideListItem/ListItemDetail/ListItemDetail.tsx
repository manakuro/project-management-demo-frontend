import React from 'react'
import { Flex } from 'src/components/atoms'
import { Item } from 'src/components/organisms/Navigation/Help/Body/GuideListItem'
import { Background } from './Background'
import { Header } from './Header'
import { Detail } from './Detail'

type Props = {
  item: Item
  onToggle: (id: number) => void
  seeMoreComponent: React.ReactNode
  nextItem?: Item
}

export const ListItemDetail: React.VFC<Props> = (props) => {
  const { item, onToggle, nextItem, seeMoreComponent } = props

  return (
    <Flex
      flexDirection="column"
      borderRadius="md"
      minH="340px"
      color="gray.700"
      bg="help.guide.bg"
    >
      <Header item={item} onToggle={onToggle} />
      <Background src={item.src} />
      <Detail
        item={item}
        onToggle={onToggle}
        seeMoreComponent={seeMoreComponent}
        nextItem={nextItem}
      />
    </Flex>
  )
}
