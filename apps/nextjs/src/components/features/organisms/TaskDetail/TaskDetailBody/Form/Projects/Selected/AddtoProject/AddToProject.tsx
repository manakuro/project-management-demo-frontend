import { Box, Button, Icon } from '@/components/ui/atoms';
import { memo } from 'react';

export const AddToProject = memo(function AddToProject() {
  return (
    <Button as={Box} variant="ghost" size="xs" cursor="pointer">
      <Icon icon="plus" color="text.muted" />
    </Button>
  );
});
