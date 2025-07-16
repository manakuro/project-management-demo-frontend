import { useCallback } from 'react';
import { atom, useRecoilState } from 'recoil';
import { useMentionLazyQuery as useQuery } from 'src/graphql/hooks';
import type { Mention } from 'src/store/entities/mention';
import { useWorkspace } from 'src/store/entities/workspace';

const key = (str: string) =>
  `src/hooks/queries/entities/useMentionsQuery/${str}`;

const loadingState = atom<boolean>({
  key: key('loadingState'),
  default: false,
});

const mentionsState = atom<Mention[]>({
  key: key('mentionsState'),
  default: [],
});

type Props = {
  queryText: string;
};
export const useMentionsQuery = () => {
  const [loading, setLoading] = useRecoilState(loadingState);
  const [mentions, setMentions] = useRecoilState(mentionsState);
  const [refetchQuery] = useQuery({
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      if (!data.mentions) return;

      setMentions(data.mentions as Mention[]);
    },
  });
  const { workspace } = useWorkspace();

  const refetch = useCallback(
    async (props: Props) => {
      setLoading(true);
      await refetchQuery({
        variables: {
          where: {
            workspaceId: workspace.id,
            query: props.queryText,
            limit: 10,
          },
        },
      });
      setLoading(false);
    },
    [refetchQuery, setLoading, workspace.id],
  );

  return {
    refetch,
    mentions,
    loading,
  };
};
