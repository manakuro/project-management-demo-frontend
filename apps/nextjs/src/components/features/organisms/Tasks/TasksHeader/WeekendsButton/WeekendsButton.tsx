import { memo } from 'react';
import { Button, Icon } from 'src/components/ui/atoms';

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
