import React, { memo, useCallback, useMemo } from 'react'
import { MenuItemOption } from 'src/components/organisms/Menu'
import {
  MenuSelect,
  MenuSelectButton,
  MenuSelectList,
} from 'src/components/organisms/Menus'
import { Button, Icon } from 'src/components/ui/atoms'
import { ChakraProps } from 'src/shared/chakra'
import {
  InboxListFilterStatuses,
  INBOX_LIST_FILTER_STATUS_TYPE_ASSIGNED_TO_ME,
  INBOX_LIST_FILTER_STATUS_TYPE_MENTIONED,
  INBOX_LIST_FILTER_STATUS_TYPE_ASSIGNED_BY_ME,
  INBOX_LIST_FILTER_STATUS_TYPE_UNREAD_ONLY,
  INBOX_LIST_FILTER_STATUS_TYPE_ALL,
  useInboxListStatus,
} from 'src/store/app/inbox/activity/inboxListStatus'

type Props = {}

const items: {
  value: InboxListFilterStatuses
  text: string
}[] = [
  {
    value: INBOX_LIST_FILTER_STATUS_TYPE_ALL,
    text: 'All',
  },
  {
    value: INBOX_LIST_FILTER_STATUS_TYPE_ASSIGNED_TO_ME,
    text: 'Assigned To Me',
  },
  {
    value: INBOX_LIST_FILTER_STATUS_TYPE_MENTIONED,
    text: '@Mentioned',
  },
  {
    value: INBOX_LIST_FILTER_STATUS_TYPE_ASSIGNED_BY_ME,
    text: 'Assigned By Me',
  },
  {
    value: INBOX_LIST_FILTER_STATUS_TYPE_UNREAD_ONLY,
    text: 'Unread only',
  },
]

export const FilterButton: React.FC<Props> = memo<Props>(() => {
  const { onFilter, filterStatus, isFiltered } = useInboxListStatus()

  const handleChange = useCallback(
    (status: ToString<InboxListFilterStatuses>) => {
      onFilter(Number(status) as InboxListFilterStatuses)
    },
    [onFilter],
  )
  const isActiveButton = useMemo(() => !isFiltered('all'), [isFiltered])
  const buttonStyle = useMemo(
    (): ChakraProps => ({
      ...(isActiveButton ? { bg: 'teal.100', _hover: { bg: 'teal.100' } } : {}),
    }),
    [isActiveButton],
  )

  const text = useMemo<string>(() => {
    if (isFiltered('all')) return ''

    return `: ${items.find((i) => i.value === filterStatus)!.text}`
  }, [isFiltered, filterStatus])

  return (
    <MenuSelect<ToString<InboxListFilterStatuses>>
      onChange={handleChange}
      placement="bottom-start"
    >
      <MenuSelectButton
        variant="ghost"
        aria-label="Sort tasks"
        as={Button}
        leftIcon={<Icon icon="filter" />}
        size="xs"
        {...buttonStyle}
      >
        Filter{text}
      </MenuSelectButton>
      <MenuSelectList defaultValue={filterStatus.toString()}>
        {items.map((item, i) => (
          <MenuItemOption value={item.value.toString()} key={i} isDisabled>
            {item.text}
          </MenuItemOption>
        ))}
      </MenuSelectList>
    </MenuSelect>
  )
})
FilterButton.displayName = 'FilterButton'
