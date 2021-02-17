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
            ? defaultTheme.colors.gray['700']
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
    primary: defaultTheme.colors.teal['400'],
    alert: defaultTheme.colors.red['400'],

    text: {
      muted: defaultTheme.colors.gray['400'],
    },
    link: defaultTheme.colors.cyan['400'],
    navigation: {
      hover: 'rgba(255,255,255,.08)',
      selected: 'rgba(255,255,255,.16)',
    },
    help: {
      guide: {
        bg: '#f6f8f9',
      },
    },
  },
})

export const transitions = {
  base: 'all .15s ease-out',
} as const
