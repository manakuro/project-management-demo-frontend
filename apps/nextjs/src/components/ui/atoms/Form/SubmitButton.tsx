import { useFormikContext } from 'formik';
import type React from 'react';
import { memo } from 'react';
import { Button, type ButtonProps } from 'src/components/ui/atoms';

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
