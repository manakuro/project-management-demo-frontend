import type React from 'react';
import { Box, Divider, Heading } from 'src/components/ui/atoms';

type Props = {
  title?: string;
};

export const Section: React.FCWithChildren<Props> = (props) => {
  return (
    <Box mt={4}>
      <Divider />
      {props.title && (
        <Heading as="h4" size="sm" my={4}>
          {props.title}
        </Heading>
      )}
      <Box mt={props.title ? 0 : 4}>{props.children}</Box>
    </Box>
  );
};
