import React from 'react'
import { useReactNodeViewPortals } from './ReactNodeViewPortals'

export const Portals: React.FC = React.memo(() => {
  const portals = useReactNodeViewPortals()
  return <>{Object.values(portals).map((obj) => obj.portal)}</>
})
