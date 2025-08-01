import { DashedBox, type FlexProps, Icon } from '@/components/ui/atoms';
import type React from 'react';

type Props = FlexProps & {
  size: Sizes;
};
export type NewBoxProps = Props;

const sizes = {
  '3xl': {
    w: '120px',
    h: '120px',
  },
  lg: {
    w: 16,
    h: 16,
  },
  md: {
    w: 12,
    h: 12,
  },
} as const;
type Sizes = keyof typeof sizes;

export const NewBox: React.FC<Props> = (props) => {
  const { size, color, ...rest } = props;
  const sizeStyle = sizes[size];

  return (
    <DashedBox {...sizeStyle} {...rest}>
      <Icon size="md" icon="plus" />
    </DashedBox>
  );
};
