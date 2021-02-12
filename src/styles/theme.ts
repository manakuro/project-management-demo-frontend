import { extendTheme, theme as defaultTheme } from '@chakra-ui/react'

// Disabling border for non-keyboard interactions
// @see https://github.com/chakra-ui/chakra-ui/blob/develop/packages/css-reset/README.md
import 'focus-visible/dist/focus-visible'

export const theme = extendTheme({
  styles: {
    global: (props) => ({
      '*': {
        WebkitFontSmoothing: 'antialiased',
        fontSmoothing: 'antialiased',
      },
      'html, body': {
        width: '100%',
        height: '100%',
        fontFamily: 'Roboto',
        overflow: 'hidden',
        color:
          props.colorMode === 'light'
            ? (defaultTheme.colors as any).gray['700']
            : defaultTheme.colors.whiteAlpha,
      },
      a: {
        _hover: {
          textDecoration: 'none !important',
        },
      },
    }),
  },

  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },

  colors: {
    primary: (defaultTheme.colors as any).teal['400'],
    alert: (defaultTheme.colors as any).red['400'],

    text: {
      muted: (defaultTheme.colors as any).gray['400'],
    },
    navigation: {
      hover: 'rgba(255,255,255,.08)',
      selected: 'rgba(255,255,255,.16)',
    },
  },
})
