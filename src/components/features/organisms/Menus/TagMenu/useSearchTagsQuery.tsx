import { useCallback } from 'react'
import { atom, useRecoilState } from 'recoil'
import { useTagsLazyQuery } from 'src/graphql/hooks'
import type { TagResponse, TagsQuery } from 'src/graphql/types/tag'
import { getNodesFromEdges } from 'src/shared/apollo/util'
import { useWorkspace } from 'src/store/entities/workspace'

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
  const [refetchQuery] = useTagsLazyQuery()
  const { workspace } = useWorkspace()

  const refetch = useCallback(
    async (props: Props) => {
      setState((s) => ({ ...s, loading: true }))
      const res = await refetchQuery({
        variables: {
          first: 10,
          where: {
            nameContainsFold: props.queryText,
            workspaceID: workspace.id,
          },
        },
      })

      const tags = getNodesFromEdges<TagResponse, TagsQuery['tags']>(
        res.data?.tags,
      )

      setState((s) => ({ ...s, tags, loading: false }))
      return tags
    },
    [refetchQuery, setState, workspace.id],
  )

  return {
    refetch,
    ...state,
  }
}
