import React, { memo, useMemo } from 'react'
import { AccordionIcon } from 'src/components/organisms/Accordion'
import { useNavigation } from 'src/components/organisms/Navigation'
import { NavListItem } from 'src/components/organisms/Navigation/NavListItem'
import { Divider } from '../../Divider'
import {
  CustomNavList,
  CustomNavListAccordion,
  CustomNavListAccordionItem,
  CustomNavListAccordionButton,
  CustomNavListAccordionPanel,
  CustomNavListAccordionPanelList,
  CustomNavListHeader,
} from '../CustomNavList'

type Props = {}

export const Favorites: React.VFC<Props> = memo(() => {
  const { isExpanded } = useNavigation()

  const title = useMemo(() => (isExpanded ? 'Favorites' : 'Fav'), [isExpanded])
  const listItems = useMemo(
    () =>
      [
        {
          name: 'All Items',
          href: '/',
          icon: 'gridAlt',
        },
        {
          name: 'Deleted Items',
          href: '/',
          icon: 'trashAlt',
        },
      ] as const,
    [],
  )

  return (
    <>
      <Divider />
      <CustomNavList>
        <CustomNavListAccordion>
          <CustomNavListAccordionItem>
            <CustomNavListAccordionButton>
              <CustomNavListHeader>{title}</CustomNavListHeader>
              <AccordionIcon />
            </CustomNavListAccordionButton>
            <CustomNavListAccordionPanel>
              <CustomNavListAccordionPanelList>
                {listItems.map((listItem, i) => (
                  <NavListItem item={listItem} key={i} />
                ))}
              </CustomNavListAccordionPanelList>
            </CustomNavListAccordionPanel>
          </CustomNavListAccordionItem>
        </CustomNavListAccordion>
      </CustomNavList>
    </>
  )
})
Favorites.displayName = 'Favorites'
