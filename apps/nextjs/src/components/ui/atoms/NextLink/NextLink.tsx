import {
  type DynamicRoutes,
  type StaticRoutes,
  convertPathnameObjToPathname,
  routes,
} from '@/router';
import Link, { type LinkProps } from 'next/link';
import type React from 'react';
import { type PropsWithChildren, memo, useMemo } from 'react';

type Props = PropsWithChildren<
  Omit<LinkProps, 'href'> & {
    href: StaticRoutes | DynamicRoutes;
  }
>;

export const NextLink: React.FC<Props> = memo<Props>((props) => {
  const href = useMemo(() => {
    return typeof props.href === 'object'
      ? convertPathnameObjToPathname(props.href)
      : props.href;
  }, [props.href]);

  const route = useMemo(() => routes.find((r) => r.regex.test(href)), [href]);

  if (!route) {
    console.error('There is no link: ', props.href);
  }

  return <Link {...props} href={href} />;
});
NextLink.displayName = 'NextLink';
