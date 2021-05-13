import React, { createContext, useCallback, useContext, useState } from 'react'

type ContextProps = {
  count: number
  setCount: React.Dispatch<React.SetStateAction<number>>
  currentIndex: number
  setCurrentIndex: (currentIndex: number) => void
}

const Context = createContext<ContextProps>({
  count: 0,
  setCount: () => {},
  currentIndex: 0,
  setCurrentIndex: () => {},
})
export const useCarousel = () => useContext(Context)

type Props = {
  onChange?: (currentIndex: number) => void
  defaultIndex?: number
}
export const Provider: React.FC<Props> = (props) => {
  const [currentIndex, setCurrentIndex] = useState<number>(
    props.defaultIndex ?? 0,
  )
  const [count, setCount] = useState<number>(0)

  const handleSetCurrentIndex = useCallback(
    (index: number) => {
      setCurrentIndex(index)
      props.onChange?.(index)
    },
    [setCurrentIndex, props],
  )

  return (
    <Context.Provider
      value={{
        count,
        setCount,
        currentIndex,
        setCurrentIndex: handleSetCurrentIndex,
      }}
    >
      {props.children}
    </Context.Provider>
  )
}
