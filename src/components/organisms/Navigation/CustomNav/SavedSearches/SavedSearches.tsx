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

export const SavedSearches: React.VFC<Props> = memo(() => {
  const { isExpanded } = useNavigation()

  const title = useMemo(
    () => (isExpanded ? 'Saved searches' : 'Sav'),
    [isExpanded],
  )
  const listItems = useMemo(
    () =>
      [
        {
          name: "Tasks I've changed",
          href: '/',
          icon: 'idCard',
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
SavedSearches.displayName = 'SavedSearches'
