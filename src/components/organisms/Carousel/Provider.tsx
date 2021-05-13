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
}
export const Provider: React.FC<Props> = (props) => {
  const currentIndexState = useState<number>(0)
  const [count, setCount] = useState<number>(0)

  const handleCurrentIndex = useCallback(
    (index: number) => {
      currentIndexState[1](index)
      props.onChange?.(index)
    },
    [currentIndexState, props],
  )

  return (
    <Context.Provider
      value={{
        count,
        setCount,
        currentIndex: currentIndexState[0],
        setCurrentIndex: handleCurrentIndex,
      }}
    >
      {props.children}
    </Context.Provider>
  )
}
