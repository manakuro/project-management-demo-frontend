import React, { ReactText, useCallback, useContext, useReducer } from 'react'

type Props = {}

const initialState = {}

export type ReactNodeViewPortalsContextProps = {
  createPortal: (portal: any) => void
}
const ReactNodeViewPortalsContext = React.createContext<ReactNodeViewPortalsContextProps>(
  {
    createPortal: () => {},
  },
)

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

  console.log('data: ', data)

  return (
    <ReactNodeViewPortalsContext.Provider value={{ createPortal }}>
      {props.children}
      {/*{Object.values(data).map((obj) => obj.portal)}*/}
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
