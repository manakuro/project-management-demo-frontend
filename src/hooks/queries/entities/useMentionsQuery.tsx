import { useCallback, useMemo } from 'react'
import { atom, useRecoilState } from 'recoil'
import { useMentionLazyQuery as useQuery } from 'src/graphql/hooks'
import { Mention } from 'src/store/entities/mention'
import { useWorkspace } from 'src/store/entities/workspace'

const key = (str: string) =>
  `src/hooks/queries/entities/useMentionsQuery/${str}`

const mentionsQueryState = atom<{
  loading: boolean
}>({
  key: key('mentionsQueryState'),
  default: {
    loading: false,
  },
})

type Props = {
  queryText: string
}
export const useMentionsQuery = () => {
  const [state, setState] = useRecoilState(mentionsQueryState)
  const [refetchQuery, res] = useQuery({
    fetchPolicy: 'no-cache',
  })
  const { workspace } = useWorkspace()
  const mentions = useMemo<Mention[]>(
    () => (res.data?.mentions || []) as Mention[],
    [res.data?.mentions],
  )

  const refetch = useCallback(
    async (props: Props) => {
      setState((s) => ({ ...s, loading: true }))
      await refetchQuery({
        variables: {
          where: {
            workspaceId: workspace.id,
            query: props.queryText,
            limit: 10,
          },
        },
      })
      setState((s) => ({ ...s, loading: false }))
    },
    [refetchQuery, setState, workspace.id],
  )

  return {
    refetch,
    mentions,
    ...state,
  }
}
