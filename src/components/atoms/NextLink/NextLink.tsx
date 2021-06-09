import Link, { LinkProps } from 'next/link'
import React from 'react'
import { Routes, routes } from 'src/router'

type Props = Omit<LinkProps, 'href'> & {
  href: Routes
}

export const NextLink: React.FC<Props> = (props) => {
  const route = routes.find((r) => r.name === props.href)
  if (!route) {
    console.warn('There is no link: ', props.href)
  }

  return <Link {...props} href={route?.href ?? '/'} />
}
