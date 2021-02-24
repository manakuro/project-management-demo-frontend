import React from 'react'
import { IconType } from 'src/components/atoms'
import { ListItem } from './ListItem'
import { ListItemDetail } from './ListItemDetail'

export type Item = {
  id: number
  number: number
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
  time: string
}
type Props = {
  item: Item
  isOpen: boolean
  onToggle: (id: number) => void
}

export const PADDING_X = 4
export const GuideListItem: React.VFC<Props> = (props) => {
  const { item, isOpen, onToggle } = props

  return (
    <>
      {isOpen ? (
        <ListItemDetail item={item} onToggle={onToggle} />
      ) : (
        <ListItem item={item} onToggle={onToggle} />
      )}
    </>
  )
}
