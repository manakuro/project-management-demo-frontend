import React from 'react'
import { List } from 'src/components/ui/atoms'

type Props = {}

export const CustomNavListAccordionPanelList: React.FCWithChildren<Props> = (
  props,
) => {
  return <List mb={2} {...props} />
}
