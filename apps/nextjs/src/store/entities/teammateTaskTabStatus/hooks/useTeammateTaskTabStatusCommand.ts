import { useRecoilCallback } from 'recoil';
import { useUpdateTeammateTaskTabStatusMutation } from 'src/graphql/hooks';
import { tabStatusState } from '../atom';
import {
  type TeammateTaskTabStatus,
  TeammateTaskTabStatusCode,
  type TeammateTaskTabStatusCodeKey,
} from '../type';
import { useUpsert } from './useUpsert';

export const useTeammateTaskTabStatusCommand = () => {
  const [updateTeammateTaskTabStatusMutation] =
    useUpdateTeammateTaskTabStatusMutation();
  const { upsert } = useUpsert();

  const setTabStatus = useRecoilCallback(
    ({ snapshot }) =>
      async (key: TeammateTaskTabStatusCodeKey) => {
        const prev = await snapshot.getPromise(tabStatusState);
        const input: Partial<TeammateTaskTabStatus> = {
          statusCode: TeammateTaskTabStatusCode[key],
        };
        if (!prev.id) return;
        if (prev.statusCode === input.statusCode) return;

        upsert(input);

        const restore = () => {
          upsert(prev);
        };

        try {
          const res = await updateTeammateTaskTabStatusMutation({
            variables: {
              input: {
                id: prev.id,
                requestId: '',
                ...input,
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
    [updateTeammateTaskTabStatusMutation, upsert],
  );

  return {
    setTabStatus,
  };
};
