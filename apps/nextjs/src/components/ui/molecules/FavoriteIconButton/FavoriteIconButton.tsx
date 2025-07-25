import type React from 'react';
import { memo, useCallback } from 'react';
import {
  Icon,
  IconButton,
  type IconButtonProps,
  type IconProps,
} from 'src/components/ui/atoms';

type Props = {
  favoriteId: string;
  isFavorite: (favoriteId: string) => boolean;
  setFavorite: (favoriteId: string) => void;
  iconStyle?: {
    favorite?: Omit<IconProps, 'icon'>;
    none?: Omit<IconProps, 'icon'>;
  };
} & Omit<IconButtonProps, 'aria-label'>;
export type FavoriteButtonProps = Props;

export const FavoriteIconButton: React.FC<Props> = memo<Props>((props) => {
  const { favoriteId, iconStyle, isFavorite, setFavorite, ...rest } = props;

  const favoriteIconStyle: IconProps = isFavorite(favoriteId)
    ? { icon: 'starFilled', color: 'yellow.300', ...iconStyle?.favorite }
    : { icon: 'starOutline', ...iconStyle?.none };

  const ariaLabel = isFavorite(favoriteId) ? 'delete favorite' : 'add favorite';

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      e.preventDefault();

      setFavorite(favoriteId);
    },
    [favoriteId, setFavorite],
  );

  return (
    <IconButton
      onClick={handleClick}
      aria-label={ariaLabel}
      role="button"
      icon={<Icon {...favoriteIconStyle} size="xs" />}
      variant="ghost"
      {...rest}
    />
  );
});
FavoriteIconButton.displayName = 'FavoriteIconButton';
