import React, { createContext, memo } from 'react'

export function createProvider<ContextProps, Props>(
  useValue: (props: Props) => ContextProps,
) {
  const Context = createContext<ContextProps>({} as ContextProps)
  const useContext = () => React.useContext(Context)

  const Provider: React.FC<Props> = memo((props) => {
    return <Component {...props} {...useValue(props)} />
  })
  Provider.displayName = 'Provider'

  const Component: React.FC<Props & ContextProps> = memo(
    ({ children, ...rest }) => {
      return (
        <Context.Provider value={rest as unknown as ContextProps}>
          {children}
        </Context.Provider>
      )
    },
  )

  return {
    Provider,
    Context,
    useContext,
  }
}
