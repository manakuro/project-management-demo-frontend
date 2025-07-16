import { useRecoilCallback } from 'recoil';
import {
  useCreateFavoriteWorkspaceMutation,
  useDeleteFavoriteWorkspaceMutation,
} from 'src/graphql/hooks';
import { useMe } from 'src/store/entities/me';
import { favoriteWorkspaceIdsState } from '../atom';
import {
  FAVORITE_WORKSPACE_IDS_UPDATED_SUBSCRIPTION_REQUEST_ID,
  useFavoriteWorkspaceIdsUpdatedSubscription,
} from './useFavoriteWorkspaceIdsUpdatedSubscription';
import { useUpsert } from './useUpsert';

export const useFavoriteWorkspaceIdsCommand = () => {
  const { me } = useMe();
  const [createFavoriteWorkspaceMutation] =
    useCreateFavoriteWorkspaceMutation();
  const [deleteFavoriteWorkspaceMutation] =
    useDeleteFavoriteWorkspaceMutation();
  const { upsert } = useUpsert();

  useFavoriteWorkspaceIdsUpdatedSubscription({
    teammateId: me.id,
  });

  const deleteFavoriteWorkspaceId = useRecoilCallback(
    ({ snapshot }) =>
      async (favoriteWorkspaceId: string) => {
        const prev = await snapshot.getPromise(favoriteWorkspaceIdsState);

        upsert(prev.filter((id) => id !== favoriteWorkspaceId));

        const restore = () => {
          upsert(prev);
        };

        try {
          const res = await deleteFavoriteWorkspaceMutation({
            variables: {
              input: {
                teammateId: me.id,
                workspaceId: favoriteWorkspaceId,
                requestId:
                  FAVORITE_WORKSPACE_IDS_UPDATED_SUBSCRIPTION_REQUEST_ID,
              },
            },
          });

          if (res.errors) {
            restore();
          }
        } catch (e) {
          restore();
          throw e;
        }
      },
    [deleteFavoriteWorkspaceMutation, me.id, upsert],
  );

  const addFavoriteWorkspaceId = useRecoilCallback(
    ({ snapshot }) =>
      async (favoriteWorkspaceId: string) => {
        const prev = await snapshot.getPromise(favoriteWorkspaceIdsState);

        upsert([...prev, favoriteWorkspaceId]);

        const restore = () => {
          upsert(prev);
        };

        try {
          const res = await createFavoriteWorkspaceMutation({
            variables: {
              input: {
                teammateId: me.id,
                workspaceId: favoriteWorkspaceId,
                requestId:
                  FAVORITE_WORKSPACE_IDS_UPDATED_SUBSCRIPTION_REQUEST_ID,
              },
            },
          });

          if (res.errors) {
            restore();
          }
        } catch (e) {
          restore();
          throw e;
        }
      },
    [createFavoriteWorkspaceMutation, me.id, upsert],
  );

  const setFavoriteWorkspaceId = useRecoilCallback(
    ({ snapshot }) =>
      async (favoriteWorkspaceId: string) => {
        const prev = await snapshot.getPromise(favoriteWorkspaceIdsState);

        const isFavorite = prev.some((id) => id === favoriteWorkspaceId);
        if (isFavorite) {
          await deleteFavoriteWorkspaceId(favoriteWorkspaceId);
          return;
        }

        await addFavoriteWorkspaceId(favoriteWorkspaceId);
      },
    [addFavoriteWorkspaceId, deleteFavoriteWorkspaceId],
  );

  return {
    setFavoriteWorkspaceId,
  };
};
