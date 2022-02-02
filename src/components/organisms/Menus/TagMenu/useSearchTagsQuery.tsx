import { useCallback } from 'react'
import { atom, useRecoilState } from 'recoil'
import { TaskTag } from 'src/store/entities/tags'

const key = (str: string) =>
  `src/components/organisms/Menus/TagMenu/useSearchTagsQuery/${str}`

const searchTagsQueryState = atom<{ loading: boolean; tags: any[] }>({
  key: key('searchTagsQueryState'),
  default: {
    loading: false,
    tags: [],
  },
})

type Props = {
  queryText: string
}
export const useSearchTagsQuery = () => {
  const [state, setState] = useRecoilState(searchTagsQueryState)

  const refetch = useCallback(
    async (props: Props) => {
      setState((s) => ({ ...s, loading: true }))
      const res = await fetchProjects()
      const filtered = res.filter((r) =>
        r.tag.name.toLowerCase().includes(props.queryText.toLowerCase()),
      )
      setState((s) => ({ ...s, tags: filtered, loading: false }))
      return filtered
    },
    [setState],
  )

  return {
    refetch,
    ...state,
  }
}

const fetchProjects = (): Promise<TaskTag[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          taskId: '1',
          tag: {
            id: '1',
            name: 'Medium',
            color: {
              id: '1',
              name: 'green.400',
              color: 'green.400',
              createdAt: '',
              updatedAt: '',
            },
            createdAt: '',
            updatedAt: '',
          },
          tagId: '1',
          createdAt: '',
          updatedAt: '',
        },
        {
          id: '2',
          taskId: '1',
          tagId: '2',
          tag: {
            id: '2',
            name: 'Asana',
            color: {
              id: '2',
              name: 'pink.200',
              color: 'pink.200',
              createdAt: '',
              updatedAt: '',
            },
            createdAt: '',
            updatedAt: '',
          },
          createdAt: '',
          updatedAt: '',
        },
      ])
    }, 300)
  })
}
