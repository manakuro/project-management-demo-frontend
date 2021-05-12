import React, { createContext, useContext, useState } from 'react'

type ContextProps = {
  count: number
  setCount: React.Dispatch<React.SetStateAction<number>>
  currentIndex: number
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>
}

const Context = createContext<ContextProps>({
  count: 0,
  setCount: () => {},
  currentIndex: 0,
  setCurrentIndex: () => {},
})
export const useCarousel = () => useContext(Context)

export const Provider: React.FC = (props) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [count, setCount] = useState<number>(0)

  return (
    <Context.Provider
      value={{
        count,
        setCount,
        currentIndex,
        setCurrentIndex,
      }}
    >
      {props.children}
    </Context.Provider>
  )
}
