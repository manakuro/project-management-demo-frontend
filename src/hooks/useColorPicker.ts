import { useCallback, useMemo } from 'react'
import { Colors } from 'src/shared/chakra'

type Color = {
  id: string
  name: string
  base: Colors
  light: Colors
}

export const COLORS: Color[] = [
  {
    id: '1',
    name: 'gray',
    base: 'gray.400',
    light: 'gray.200',
  },

  {
    id: '2',
    name: 'red',
    base: 'red.400',
    light: 'red.200',
  },

  {
    id: '3',
    name: 'orange',
    base: 'orange.400',
    light: 'orange.200',
  },

  {
    id: '4',
    name: 'yellow',
    base: 'yellow.400',
    light: 'yellow.200',
  },

  {
    id: '5',
    name: 'green',
    base: 'green.400',
    light: 'green.200',
  },

  {
    id: '6',
    name: 'teal',
    base: 'teal.400',
    light: 'teal.200',
  },

  {
    id: '7',
    name: 'blue',
    base: 'blue.400',
    light: 'blue.200',
  },

  {
    id: '8',
    name: 'cyan',
    base: 'cyan.400',
    light: 'cyan.200',
  },

  {
    id: '9',
    name: 'purple',
    base: 'purple.400',
    light: 'purple.200',
  },

  {
    id: '10',
    name: 'pink',
    base: 'pink.400',
    light: 'pink.200',
  },
]

export const useColorPicker = () => {
  const findColor = useCallback(
    (id: string) => COLORS.find((c) => c.id === id)!,
    [],
  )

  const colors = useMemo(() => COLORS, [])

  return {
    colors,
    findColor,
  }
}