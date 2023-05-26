import { useCallback } from 'react'
import { atom, useRecoilState } from 'recoil'
import { useProjectTeammatesLazyQuery } from 'src/graphql/hooks'
import {
  ProjectTeammateResponse,
  ProjectTeammatesQuery,
} from 'src/graphql/types/projectTeammate'
import { getNodesFromEdges } from 'src/shared/apollo/util'
import { Teammate } from 'src/store/entities/teammate'

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
  const [refetchQuery] = useProjectTeammatesLazyQuery()

  const refetch = useCallback(
    async (props: Props) => {
      setState((s) => ({ ...s, loading: true }))
      const res = await refetchQuery({
        variables: {
          first: 10,
          where: {
            hasTeammateWith: [
              {
                or: [
                  { emailContainsFold: props.queryText },
                  { nameContainsFold: props.queryText },
                ],
              },
            ],
          },
        },
      })
      const projectTeammates = getNodesFromEdges<
        ProjectTeammateResponse,
        ProjectTeammatesQuery['projectTeammates']
      >(res.data?.projectTeammates)

      const teammates = projectTeammates.map((p) => p.teammate)

      setState((s) => ({ ...s, teammates, loading: false }))
      return teammates
    },
    [refetchQuery, setState],
  )

  const setTeammates = useCallback(
    (val: Teammate[]) => {
      setState((s) => ({ ...s, teammates: val }))
    },
    [setState],
  )

  const setLoading = useCallback(
    (val: boolean) => {
      setState((s) => ({ ...s, loading: val }))
    },
    [setState],
  )

  return {
    refetch,
    setTeammates,
    setLoading,
    ...state,
  }
}
