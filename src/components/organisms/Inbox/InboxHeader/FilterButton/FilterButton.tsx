import React, { memo, useCallback, useMemo } from 'react'
import { Button, Icon } from 'src/components/atoms'
import { MenuItemOption } from 'src/components/organisms/Menu'
import {
  MenuSelect,
  MenuSelectButton,
  MenuSelectList,
} from 'src/components/organisms/Menus'
import { ChakraProps } from 'src/shared/chakra'
import {
  InboxListSortStatuses,
  INBOX_LIST_SORT_STATUS_TYPE_ASSIGNED_TO_ME,
  INBOX_LIST_SORT_STATUS_TYPE_MENTIONED,
  INBOX_LIST_SORT_STATUS_TYPE_ASSIGNED_BY_ME,
  INBOX_LIST_SORT_STATUS_TYPE_UNREAD_ONLY,
  INBOX_LIST_SORT_STATUS_TYPE_ALL,
  useInboxListStatus,
} from 'src/store/app/inbox/activity/inboxListStatus'

type Props = {}

const items: {
  value: InboxListSortStatuses
  text: string
}[] = [
  {
    value: INBOX_LIST_SORT_STATUS_TYPE_ALL,
    text: 'All',
  },
  {
    value: INBOX_LIST_SORT_STATUS_TYPE_ASSIGNED_TO_ME,
    text: 'Assigned To Me',
  },
  {
    value: INBOX_LIST_SORT_STATUS_TYPE_MENTIONED,
    text: '@Mentioned',
  },
  {
    value: INBOX_LIST_SORT_STATUS_TYPE_ASSIGNED_BY_ME,
    text: 'Assigned By Me',
  },
  {
    value: INBOX_LIST_SORT_STATUS_TYPE_UNREAD_ONLY,
    text: 'Unread only',
  },
]

export const FilterButton: React.VFC<Props> = memo<Props>(() => {
  const { onSort, sortStatus, isSorted } = useInboxListStatus()

  const handleChange = useCallback(
    (status: ToString<InboxListSortStatuses>) => {
      onSort(Number(status) as InboxListSortStatuses)
    },
    [onSort],
  )
  const isActiveButton = useMemo(() => !isSorted('all'), [isSorted])
  const buttonStyle = useMemo(
    (): ChakraProps => ({
      ...(isActiveButton ? { bg: 'teal.100', _hover: { bg: 'teal.100' } } : {}),
    }),
    [isActiveButton],
  )

  const text = useMemo<string>(() => {
    if (isSorted('all')) return ''

    return `: ${items.find((i) => i.value === sortStatus)!.text}`
  }, [isSorted, sortStatus])

  return (
    <MenuSelect<ToString<InboxListSortStatuses>>
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
      <MenuSelectList defaultValue={sortStatus.toString()}>
        {items.map((item, i) => (
          <MenuItemOption value={item.value.toString()} key={i}>
            {item.text}
          </MenuItemOption>
        ))}
      </MenuSelectList>
    </MenuSelect>
  )
})
FilterButton.displayName = 'FilterButton'
