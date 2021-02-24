import React from 'react'
import { Flex } from 'src/components/atoms'
import { Item } from 'src/components/organisms/Navigation/Help/Body/GuideListItem'
import { Video } from './Video'
import { Header } from './Header'
import { Detail } from './Detail'

type Props = {
  item: Item
  onToggle: (id: number) => void
  detailComponent: React.ReactNode
  nextItem?: Item
}

export const ListItemDetail: React.VFC<Props> = (props) => {
  const { item, onToggle, nextItem, detailComponent } = props

  return (
    <Flex
      flexDirection="column"
      borderRadius="md"
      minH="340px"
      color="gray.700"
      bg="help.guide.bg"
    >
      <Header item={item} onToggle={onToggle} />
      <Video src={item.src} />
      <Detail
        item={item}
        onToggle={onToggle}
        detailComponent={detailComponent}
        nextItem={nextItem}
      />
    </Flex>
  )
}
