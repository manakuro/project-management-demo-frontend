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
      href: ROUTE_INBOX.name,
      icon: 'bell',
      isCurrentRoute: () => router.pathname === ROUTE_INBOX.href.pathname,
    }),
    [router.pathname],
  )

  return <NavListItem item={item} selectedStyle />
})
Inbox.displayName = 'Inbox'
