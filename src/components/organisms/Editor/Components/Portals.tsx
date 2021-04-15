import React from 'react'
import { useReactNodeViewPortals } from 'src/components/organisms/Editor/Components/ReactNodeViewPortals'

export const Portals: React.FC = React.memo(() => {
  const portals = useReactNodeViewPortals()
  return <>{Object.values(portals).map((obj) => obj.portal)}</>
})
