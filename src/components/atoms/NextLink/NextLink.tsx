import Link, { LinkProps } from 'next/link'
import React, { memo, useMemo } from 'react'
import { StaticRoutes, routes } from 'src/router'

type Props = Omit<LinkProps, 'href'> & {
  href: StaticRoutes | string
}

export const NextLink: React.FC<Props> = memo<Props>((props) => {
  const route = useMemo(() => {
    return routes.find((r) => {
      return r.regex.test(props.href)
    })
  }, [props.href])

  if (!route) {
    console.error('There is no link: ', props.href)
  }

  return <Link {...props} href={props.href} />
})
NextLink.displayName = 'NextLink'
