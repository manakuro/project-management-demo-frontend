import Link, { LinkProps } from 'next/link'
import React, { memo, useMemo } from 'react'
import {
  StaticRoutes,
  routes,
  DynamicRoutes,
  convertPathnameObjToPathname,
} from 'src/router'

type Props = Omit<LinkProps, 'href'> & {
  href: StaticRoutes | DynamicRoutes
}

export const NextLink: React.FC<Props> = memo<Props>((props) => {
  const href = useMemo(() => {
    return typeof props.href === 'object'
      ? convertPathnameObjToPathname(props.href)
      : props.href
  }, [props.href])

  const route = useMemo(() => {
    return routes.find((r) => {
      return r.regex.test(href)
    })
  }, [href])

  if (!route) {
    console.error('There is no link: ', props.href)
  }

  return <Link {...props} href={href} />
})
NextLink.displayName = 'NextLink'
