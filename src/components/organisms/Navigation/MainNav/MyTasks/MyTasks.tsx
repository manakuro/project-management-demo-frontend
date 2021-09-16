import { useRouter } from 'next/router'
import React, { memo, useMemo } from 'react'
import {
  ROUTE_MY_TASKS_LIST,
  ROUTE_MY_TASKS_BOARD,
  ROUTE_MY_TASKS_CALENDAR,
  ROUTE_MY_TASKS_FILES,
  ROUTE_MY_TASKS,
} from 'src/router'
import { useTabStatusForMyTasks } from 'src/store/entities/tabStatusForMyTasks'
import { NavListItem } from '../../NavListItem'
import { NavListItem as TNavListItem } from '../../type'

export const MyTasks: React.VFC = memo(() => {
  const router = useRouter()
  const { isTaskTabStatus } = useTabStatusForMyTasks()
  const href = useMemo(() => {
    switch (true) {
      case isTaskTabStatus('list'):
        return ROUTE_MY_TASKS_LIST.href.pathname()
      case isTaskTabStatus('board'):
        return ROUTE_MY_TASKS_BOARD.href.pathname()
      case isTaskTabStatus('calendar'):
        return ROUTE_MY_TASKS_CALENDAR.href.pathname()
      case isTaskTabStatus('files'):
        return ROUTE_MY_TASKS_FILES.href.pathname()
    }
  }, [isTaskTabStatus])!

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
