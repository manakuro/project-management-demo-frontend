import React, { ReactText, useCallback, useContext, useReducer } from 'react'

type Props = {}

const initialState = {}

const ReactNodeViewPortalsContext = React.createContext<Partial<State>>({})
const ReactNodeViewCreatePortalContext = React.createContext<
  (portal: any) => void
>(() => {})

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'createPortal':
      return {
        ...state,
        [action.key]: {
          portal: action.portal,
        },
      }
    default:
      return state
  }
}

export const ReactNodeViewPortalsProvider: React.FC<Props> = (props) => {
  const [data, dispatch] = useReducer(reducer, initialState)

  const createPortal = useCallback((portal: any) => {
    return dispatch({ type: 'createPortal', key: portal.key!, portal })
  }, [])

  return (
    <ReactNodeViewPortalsContext.Provider value={data}>
      <ReactNodeViewCreatePortalContext.Provider value={createPortal}>
        {props.children}
      </ReactNodeViewCreatePortalContext.Provider>
    </ReactNodeViewPortalsContext.Provider>
  )
}

type State = {
  [key: string]: any
}

type Action = {
  type: 'createPortal'
  key: ReactText
  portal: any
}

export const useReactNodeViewPortals = () =>
  useContext(ReactNodeViewPortalsContext)
export const useReactNodeViewCreatePortal = () =>
  useContext(ReactNodeViewCreatePortalContext)
