import type React from 'react';
import { memo, useCallback } from 'react';
import {
  IconButton,
  type IconButtonProps,
  type TextProps,
} from 'src/components/ui/atoms';
import { Icon } from './Icon';

type Props = {
  hasAnyoneLiked: boolean;
  label: string;
  likeLength: number;
  onToggleLike: () => void;
  show?: boolean;
  textStyle?: TextProps;
} & Omit<IconButtonProps, 'aria-label' | 'icon' | 'textStyle'>;
export type LikeButtonProps = Props;

export const LikeIconButton: React.FC<Props> = memo<Props>((props) => {
  const {
    hasAnyoneLiked,
    label,
    likeLength,
    onToggleLike,
    show,
    textStyle,
    ...rest
  } = props;

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      onToggleLike();
    },
    [onToggleLike],
  );

  if (!props.show) return null;

  return (
    <IconButton
      aria-label="Like this"
      icon={
        <Icon
          hasAnyoneLiked={hasAnyoneLiked}
          label={label}
          likeLength={likeLength}
          textStyle={textStyle}
        />
      }
      variant="ghost"
      size="sm"
      onClick={handleClick}
      {...rest}
    />
  );
});
LikeIconButton.displayName = 'LikeIconButton';
