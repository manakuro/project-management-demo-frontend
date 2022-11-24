import { useRouter } from 'next/router'
import React, { memo, useMemo } from 'react'
import {
  ROUTE_MY_TASKS_LIST,
  ROUTE_MY_TASKS_BOARD,
  ROUTE_MY_TASKS_CALENDAR,
  ROUTE_MY_TASKS_FILES,
  ROUTE_MY_TASKS,
} from 'src/router'
import { useTeammateTaskTabStatus } from 'src/store/entities/teammateTaskTabStatus'
import { NavListItem } from '../../NavListItem'
import { NavListItem as TNavListItem } from '../../type'

export const MyTasks: React.FC = memo(() => {
  const router = useRouter()
  const { isTabStatus } = useTeammateTaskTabStatus()
  const href = useMemo(() => {
    switch (true) {
      case isTabStatus('List'):
        return ROUTE_MY_TASKS_LIST.href.pathname()
      case isTabStatus('Board'):
        return ROUTE_MY_TASKS_BOARD.href.pathname()
      case isTabStatus('Calendar'):
        return ROUTE_MY_TASKS_CALENDAR.href.pathname()
      case isTabStatus('Files'):
        return ROUTE_MY_TASKS_FILES.href.pathname()
    }
  }, [isTabStatus])!

  const item = useMemo<TNavListItem>(
    () => ({
      name: 'My Tasks',
      href: href,
      icon: 'checkCircle',
      isCurrentRoute: () => {
        return router.pathname.includes(ROUTE_MY_TASKS.href.pathname())
      },
    }),
    [router.pathname, href],
  )

  return <NavListItem item={item} />
})
MyTasks.displayName = 'MyTasks'
