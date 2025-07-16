import type React from 'react'
import { useEffect, useState } from 'react'

type Props = {
  client?: boolean
  server?: boolean
}

export const ConditionalRender: React.FCWithChildren<Props> = (props) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => setIsMounted(true), [])

  if (!isMounted && props.client) return null
  if (isMounted && props.server) return null
  return props.children as React.ReactElement
}
