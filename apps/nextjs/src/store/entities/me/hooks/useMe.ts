import { useRecoilState } from 'recoil';
import { meState } from '../atom';

export const useMe = () => {
  const [me, setMe] = useRecoilState(meState);

  return {
    me,
    setMe,
  };
};
