import type React from 'react';
import { Tooltip } from 'src/components/ui/molecules';

type Props = {
  label: string;
};

export const Container: React.FCWithChildren<Props> = (props) => {
  return (
    <Tooltip
      hasArrow
      label={props.label}
      aria-label="Attachment file name"
      size="sm"
      withIcon
    >
      {props.children}
    </Tooltip>
  );
};
