import React, { useCallback, useContext, useState } from 'react'
import shortid from 'shortid'
import { uniqBy } from 'src/shared/utils'

type Props = {}

type Portal = {
  Component: React.FC
  container: HTMLElement
  key: string
}
const ReactNodeViewPortalsContext = React.createContext<Portal[]>([])

export type PortalHandlers = {
  createPortal: (portal: { Component: any; container: any }) => void
  removePortal: (container: HTMLElement) => void
}
const ReactNodeViewCreatePortalContext = React.createContext<PortalHandlers>({
  createPortal: () => {},
  removePortal: () => {},
})

export const ReactNodeViewPortalsProvider: React.FC<Props> = (props) => {
  const [portals, setPortals] = useState<Portal[]>([])

  const findPortal = useCallback(
    (container: HTMLElement) => portals.find((p) => p.container === container),
    [portals],
  )

  const createPortal = useCallback(
    ({ container, Component }) => {
      const newVal: Portal = {
        container,
        Component,
        key: findPortal(container)?.key ?? shortid(),
      }
      setPortals((prev) => {
        return uniqBy([...prev, newVal], 'container').map((p) => {
          if (p.container === newVal.container) {
            return {
              ...p,
              ...newVal,
            }
          }
          return p
        })
      })
    },
    [findPortal],
  )

  const removePortal = useCallback((container) => {
    setPortals((prev) => {
      return prev.filter((p) => p.container !== container)
    })
  }, [])

  return (
    <ReactNodeViewPortalsContext.Provider value={portals}>
      <ReactNodeViewCreatePortalContext.Provider
        value={{
          createPortal,
          removePortal,
        }}
      >
        {props.children}
      </ReactNodeViewCreatePortalContext.Provider>
    </ReactNodeViewPortalsContext.Provider>
  )
}

export const useReactNodeViewPortals = () =>
  useContext(ReactNodeViewPortalsContext)
export const useReactNodeViewCreatePortal = () =>
  useContext(ReactNodeViewCreatePortalContext)
