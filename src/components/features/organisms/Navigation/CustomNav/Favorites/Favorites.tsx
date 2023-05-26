import React, { memo, useMemo } from 'react'
import { useNavigation } from 'src/components/features/organisms/Navigation'
import { NavListItem } from 'src/components/features/organisms/Navigation/NavListItem'
import { AccordionIcon } from 'src/components/ui/organisms/Accordion'
import { useDisabledStyle } from 'src/hooks'
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
import { Projects } from './Projects'
import { Workspace } from './Workspace'

type Props = {}

export const Favorites: React.FC<Props> = memo(() => {
  const { isExpanded } = useNavigation()
  const { disabledStyle } = useDisabledStyle()
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
                <Projects />
                <Workspace />
                {listItems.map((listItem, i) => (
                  <NavListItem item={listItem} key={i} {...disabledStyle} />
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
