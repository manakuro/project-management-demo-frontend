import { Button, type ButtonProps } from '@/components/ui/atoms';
import { useFormikContext } from 'formik';
import type React from 'react';
import { memo } from 'react';

type Props = ButtonProps;

export const SubmitButton: React.FC<Props> = memo((props) => {
  const { isValid } = useFormikContext();

  return (
    <Button
      colorScheme="teal"
      size="sm"
      type="submit"
      isDisabled={!isValid}
      {...props}
    />
  );
});

SubmitButton.displayName = 'SubmitButton';
