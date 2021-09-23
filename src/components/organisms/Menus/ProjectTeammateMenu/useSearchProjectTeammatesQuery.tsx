import { useCallback } from 'react'
import { atom, useRecoilState } from 'recoil'
import { Teammate } from 'src/store/entities/teammates'
import { teammates } from 'src/store/entities/teammates/data'

const key = (str: string) =>
  `src/components/organisms/Menus/ProjectTeammateMenu/useSearchProjectTeammatesQuery/${str}`

const queryState = atom<{ loading: boolean; teammates: Teammate[] }>({
  key: key('queryState'),
  default: {
    loading: false,
    teammates: [],
  },
})

type Props = {
  queryText: string
}
export const useSearchProjectTeammatesQuery = () => {
  const [state, setState] = useRecoilState(queryState)

  const refetch = useCallback(
    async (props: Props) => {
      setState((s) => ({ ...s, loading: true }))
      const res = await fetch()
      const filtered = res.filter(
        (r) =>
          r.name.toLowerCase().includes(props.queryText.toLowerCase()) ||
          r.email.toLowerCase().includes(props.queryText.toLowerCase()),
      )
      setState((s) => ({ ...s, teammates: filtered, loading: false }))
      return filtered
    },
    [setState],
  )

  return {
    refetch,
    ...state,
  }
}

const fetch = (): Promise<Teammate[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: teammates.manato.id,
          name: teammates.manato.name,
          image: teammates.manato.image,
          email: teammates.manato.email,
          createdAt: '',
          updatedAt: '',
        },
        {
          id: teammates.dan.id,
          name: teammates.dan.name,
          image: teammates.dan.image,
          email: teammates.dan.email,
          createdAt: '',
          updatedAt: '',
        },
        {
          id: teammates.kent.id,
          name: teammates.kent.name,
          image: teammates.kent.image,
          email: teammates.kent.email,
          createdAt: '',
          updatedAt: '',
        },
      ])
    }, 300)
  })
}
