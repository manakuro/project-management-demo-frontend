import { useRouter } from 'next/router'
import React, { memo, useMemo } from 'react'
import { ROUTE_PORTFOLIOS } from 'src/router'
import { NavListItem } from '../../NavListItem'
import { NavListItem as TNavListItem } from '../../type'

export const Portfolios: React.VFC = memo(() => {
  const router = useRouter()

  const item = useMemo<TNavListItem>(
    () => ({
      name: 'Portfolios',
      href: ROUTE_PORTFOLIOS.href.pathname(),
      icon: 'barChart',
      isCurrentRoute: () =>
        router.pathname === ROUTE_PORTFOLIOS.href.pathname(),
    }),
    [router.pathname],
  )

  return <NavListItem item={item} disabled />
})
Portfolios.displayName = 'Portfolios'
