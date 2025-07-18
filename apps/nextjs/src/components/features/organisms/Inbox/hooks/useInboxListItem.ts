import {
  type Activity,
  useActivity,
} from 'src/store/app/inbox/activity/activities';
import {
  type ArchiveActivity,
  useArchive,
} from 'src/store/app/inbox/archive/archives';
import { useInboxContext } from '../Inbox';

type Result = {
  listItem: Activity | ArchiveActivity;
};

export const useInboxListItem = (listItemId: string): Result => {
  const { isActivity } = useInboxContext();
  const useActivityResult = useActivity(listItemId);
  const useArchiveResult = useArchive(listItemId);

  if (isActivity) {
    return {
      listItem: useActivityResult.activity,
    };
  }

  return {
    listItem: useArchiveResult.archive,
  };
};
