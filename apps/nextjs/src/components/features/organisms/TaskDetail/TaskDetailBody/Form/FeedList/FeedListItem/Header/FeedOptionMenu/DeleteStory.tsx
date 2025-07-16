import { memo } from 'react';
import { MenuItem } from 'src/components/ui/organisms/Menu';
import { useTaskFeedListItemContext } from '../../Provider';

export const DeleteStory = memo(function DeleteStory() {
  const { hasTaskFile, hasText } = useTaskFeedListItemContext();
  if (hasText || !hasTaskFile) return null;

  return <MenuItem color="alert">Delete Story</MenuItem>;
});
