import type { FormLabelProps } from '@chakra-ui/react';
import styled from '@emotion/styled';
import type React from 'react';
import { type ChakraProps, chakra } from 'src/shared/chakra';

type Props = ChakraProps & FormLabelProps;
export type LabelProps = Props;

export const Label: React.FC<Props> = (props) => {
  return <StyledLabel {...props} />;
};

const StyledLabel = chakra(styled.label``, {
  baseStyle: {
    display: 'flex',
    fontSize: 'sm',
    w: 'full',
  },
});
