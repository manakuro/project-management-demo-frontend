import { useMemo } from 'react'
import { ChakraProps, useStyleConfig } from 'src/shared/chakra'

type MenuStyle = {
  list: ChakraProps
  item: Override<
    ChakraProps,
    {
      _focus: {
        bg: ChakraProps['bg']
      }
    }
  >
}

export const useMenuStyle = () => {
  const menuStyles = useStyleConfig('Menu') as MenuStyle

  return useMemo((): MenuStyle => {
    return {
      ...menuStyles,
      item: {
        ...menuStyles.item,
        cursor: 'pointer',
        _hover: {
          bg: 'gray.100',
        },
      },
    }
  }, [menuStyles])
}
