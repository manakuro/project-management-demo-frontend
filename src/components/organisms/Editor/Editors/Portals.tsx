import React from 'react'
import ReactDOM from 'react-dom'
import { useReactNodeViewPortals } from './ReactNodeViewPortals'

export const Portals: React.FC = React.memo(() => {
  const portals = useReactNodeViewPortals()

  console.log('portals: ', portals)
  return (
    <>
      {portals.map((p) =>
        ReactDOM.createPortal(<p.Component />, p.container, p.key),
      )}
    </>
  )
})
