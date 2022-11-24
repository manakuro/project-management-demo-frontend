import { useRouter } from 'next/router'
import React, { memo, useMemo } from 'react'
import { ROUTE_HOME } from 'src/router'
import { NavListItem } from '../../NavListItem'
import { NavListItem as TNavListItem } from '../../type'

export const Home: React.FC = memo(() => {
  const router = useRouter()

  const item = useMemo<TNavListItem>(
    () => ({
      name: 'Home',
      href: ROUTE_HOME.href.pathname(),
      icon: 'home',
      isCurrentRoute: () => router.pathname === ROUTE_HOME.href.pathname(),
    }),
    [router.pathname],
  )

  return <NavListItem item={item} />
})
Home.displayName = 'Home'
