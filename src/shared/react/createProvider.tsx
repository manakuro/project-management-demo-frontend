import React, { createContext, memo } from 'react'
import { forwardRef } from 'src/shared/chakra'

export function createProvider<
  ContextProps extends object,
  Props extends object,
>(useValue: (props: Props) => ContextProps) {
  const Context = createContext<ContextProps>({} as ContextProps)
  const useContext = () => {
    const context = React.useContext(Context)
    if (!Object.keys(context).length) {
      throw new Error('Context needs to be consumed in Provider')
    }

    return context
  }

  const Provider: React.FC<Props> = memo<Props>(
    forwardRef((props, ref) => (
      <Component {...props} ref={ref} {...useValue(props)} />
    )) as React.FC<Props>,
  )
  Provider.displayName = 'Provider'

  const Component: React.FC<Props & ContextProps> = memo<Props & ContextProps>(
    forwardRef(({ children, ...rest }, ref) => {
      return (
        <Context.Provider value={{ ...(rest as unknown as ContextProps), ref }}>
          {children}
        </Context.Provider>
      )
    }) as React.FC<Props & ContextProps>,
  )

  return {
    Provider,
    Context,
    useContext,
  }
}
