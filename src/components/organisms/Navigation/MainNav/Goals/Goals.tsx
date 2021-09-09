import { useRouter } from 'next/router'
import React, { memo, useMemo } from 'react'
import { ROUTE_GOALS } from 'src/router'
import { NavListItem } from '../../NavListItem'
import { NavListItem as TNavListItem } from '../../type'

export const Goals: React.VFC = memo(() => {
  const router = useRouter()

  const item = useMemo<TNavListItem>(
    () => ({
      name: 'Goals',
      href: ROUTE_GOALS.name,
      icon: 'rocket',
      isCurrentRoute: () => router.pathname === ROUTE_GOALS.href.pathname,
    }),
    [router.pathname],
  )

  return <NavListItem item={item} selectedStyle disabled />
})
Goals.displayName = 'router'
