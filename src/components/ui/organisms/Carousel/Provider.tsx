import type React from 'react'
import { useCallback, useState } from 'react'
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
    [props],
  )

  return {
    count,
    setCount,
    currentIndex,
    setCurrentIndex: handleSetCurrentIndex,
  }
}
useValue.__PROVIDER__ = 'src/components/organisms/Carousel/Provider.tsx'
export const { Provider, useContext: useCarouselContext } =
  createProvider(useValue)
