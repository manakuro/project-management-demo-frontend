import { useRouter as useRouterNext } from 'next/router'
import { useRouterHome } from './home'
import { useRouterInbox } from './inbox'
import { useRouterMyTasks } from './myTasks'
import { useRouterProjects } from './projects'

export const useRouter = () => {
  const router = useRouterNext()
  return {
    ...useRouterHome(),
    ...useRouterInbox(),
    ...useRouterMyTasks(),
    ...useRouterProjects(),
    router,
  }
}
