import type { IconButtonProps, TextProps } from '@/components/ui/atoms';
import { LikeIconButton } from '@/components/ui/molecules';
import type React from 'react';
import { memo } from 'react';
import { useLike } from './useLike';

type Props = {
  taskId: string;
  show?: boolean;
  textStyle?: TextProps;
} & Omit<IconButtonProps, 'aria-label' | 'icon' | 'textStyle'>;

export const LikeTaskIconButton: React.FC<Props> = memo<Props>((props) => {
  const { taskId, show, ...rest } = props;
  const { hasAnyoneLiked, label, likeLength, onToggleLike } = useLike(props);

  return (
    <LikeIconButton
      show={show}
      hasAnyoneLiked={hasAnyoneLiked}
      label={label}
      likeLength={likeLength}
      onToggleLike={onToggleLike}
      {...rest}
    />
  );
});
LikeTaskIconButton.displayName = 'LikeTaskIconButton';
