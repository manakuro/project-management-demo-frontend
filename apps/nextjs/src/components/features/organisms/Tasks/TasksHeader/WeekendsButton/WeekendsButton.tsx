import { Button, Icon } from '@/components/ui/atoms';
import { memo } from 'react';

export const WeekendsButton = memo(function WeekendsButton() {
  return (
    <Button
      variant="ghost"
      leftIcon={<Icon icon="calendarAlt" color="text.muted" />}
      size="xs"
    >
      Weekends: On
    </Button>
  );
});
