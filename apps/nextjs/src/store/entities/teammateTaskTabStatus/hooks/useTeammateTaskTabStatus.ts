import { useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { tabStatusState } from '../atom';
import {
  TeammateTaskTabStatusCode,
  type TeammateTaskTabStatusCodeKey,
} from '../type';

export const useTeammateTaskTabStatus = () => {
  const state = useRecoilValue(tabStatusState);

  const isTabStatus = useCallback(
    (key: TeammateTaskTabStatusCodeKey) =>
      state.statusCode === TeammateTaskTabStatusCode[key],
    [state.statusCode],
  );

  return {
    teammateTaskTabStatus: state,
    isTabStatus,
  };
};
