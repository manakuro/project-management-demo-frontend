import { useCallback } from 'react'
import { Tag } from 'src/store/entities/tags'
import { atom, useRecoilState } from 'recoil'

const searchTagsQueryState = atom<{ loading: boolean; tags: any[] }>({
  key: 'searchTagsQueryState',
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
        r.name.toLowerCase().includes(props.queryText.toLowerCase()),
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

const fetchProjects = (): Promise<Tag[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          taskId: '1',
          name: 'Medium',
          color: {
            id: '1',
            name: 'gray.200',
            color: 'gray.200',
          },
          createdAt: '',
          updatedAt: '',
        },
        {
          id: '2',
          taskId: '1',
          name: 'Asana',
          color: {
            id: '2',
            name: 'pink.200',
            color: 'pink.200',
          },
          createdAt: '',
          updatedAt: '',
        },
      ])
    }, 300)
  })
}
