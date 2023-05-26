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

type Props = {}

export const SavedSearches: React.FC<Props> = memo(() => {
  const { isExpanded } = useNavigation()
  const { disabledStyle } = useDisabledStyle()
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
SavedSearches.displayName = 'SavedSearches'
