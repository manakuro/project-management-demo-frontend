import { atom, useRecoilState } from 'recoil'
import { useResizeObserver } from 'src/hooks/useResizeObserver'
import { useTasksListContent } from './useTasksListContent'

const taskListContentStickyVerticalState = atom<boolean>({
  key: 'taskListContentStickyVerticalState',
  default: false,
})

type Props = {
  listenOnEvent?: boolean
}
export const useTasksListContentSticky = (props?: Props) => {
  const { dom } = useTasksListContent()
  const [isStickyVertical, setIsStickyVertical] = useRecoilState(
    taskListContentStickyVerticalState,
  )

  useResizeObserver(
    (dom?.children?.[0] ?? null) as HTMLElement | null,
    (entry) => {
      const listContainerWidth = dom?.getBoundingClientRect().width ?? 0
      const listContentWidth = entry.contentRect.width
      setIsStickyVertical(listContentWidth > listContainerWidth)
    },
    {
      skip: !props?.listenOnEvent,
    },
  )

  return {
    isStickyVertical,
  }
}
