import { useRouter } from 'next/router'
import React, { memo, useMemo } from 'react'
import { ROUTE_INBOX } from 'src/router'
import { NavListItem } from '../../NavListItem'
import { NavListItem as TNavListItem } from '../../type'

export const Inbox: React.VFC = memo(() => {
  const router = useRouter()

  const item = useMemo<TNavListItem>(
    () => ({
      name: 'Inbox',
      href: ROUTE_INBOX.href.pathname(),
      icon: 'bell',
      isCurrentRoute: () =>
        router.pathname.includes(ROUTE_INBOX.href.pathname()),
    }),
    [router.pathname],
  )

  return <NavListItem item={item} />
})
Inbox.displayName = 'Inbox'
