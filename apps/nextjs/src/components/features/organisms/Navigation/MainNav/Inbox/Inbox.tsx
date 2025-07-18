import { useRouter } from 'next/router';
import type React from 'react';
import { memo, useMemo } from 'react';
import { ROUTE_INBOX } from 'src/router';
import { NavListItem } from '../../NavListItem';
import type { NavListItem as TNavListItem } from '../../type';

export const Inbox: React.FC = memo(() => {
  const router = useRouter();

  const item = useMemo<TNavListItem>(
    () => ({
      name: 'Inbox',
      href: ROUTE_INBOX.href.pathname(),
      icon: 'bell',
      isCurrentRoute: () =>
        router.pathname.includes(ROUTE_INBOX.href.pathname()),
    }),
    [router.pathname],
  );

  return <NavListItem item={item} />;
});
Inbox.displayName = 'Inbox';
