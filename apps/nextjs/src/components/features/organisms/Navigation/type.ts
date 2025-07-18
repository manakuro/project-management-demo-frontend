import type { StaticRoutes } from 'src/router';
import type { IconType } from 'src/shared/icons';

export type NavListItem = {
  name: string;
  icon: IconType;
  isCurrentRoute?: () => boolean;
} & (
  | {
      href: StaticRoutes;
      isExternal?: false | undefined | null;
    }
  | {
      href: string;
      isExternal?: true;
    }
);
