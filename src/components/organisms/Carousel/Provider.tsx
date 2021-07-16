import React, { useCallback, useState } from 'react'
import { createProvider } from 'src/shared/react/createProvider'

type ContextProps = {
  count: number
  setCount: React.Dispatch<React.SetStateAction<number>>
  currentIndex: number
  setCurrentIndex: (currentIndex: number) => void
}

type Props = {
  onChange?: (currentIndex: number) => void
  defaultIndex?: number
}

const useValue = (props: Props): ContextProps => {
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

  return {
    count,
    setCount,
    currentIndex,
    setCurrentIndex: handleSetCurrentIndex,
  }
}

export const { Provider, useContext: useCarouselContext } =
  createProvider(useValue)
