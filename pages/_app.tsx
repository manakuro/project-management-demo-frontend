import { ChakraProvider } from '@chakra-ui/react'
import enLocale from 'date-fns/locale/en-US'
import { AppProps } from 'next/app'
import React from 'react'
import { resetServerContext } from 'react-beautiful-dnd'
import { RecoilRoot } from 'recoil'
import { getLayoutDefault, LayoutDefault } from 'src/components/organisms'
import { Modals } from 'src/components/organisms'
import { BeforeAppMount } from 'src/shared/beforeAppMount'
import {
  muiTheme,
  MuiThemeProvider,
  LocalizationProvider,
  AdapterDateFns,
} from 'src/shared/material-ui'
import { theme } from 'src/styles'

export type AppLayout = { getLayout: typeof getLayoutDefault }

resetServerContext()

const App = ({ Component, pageProps }: AppProps) => {
  const getLayout =
    (Component as any).getLayout ||
    ((page: any) => <LayoutDefault>{page}</LayoutDefault>)

  return (
    <RecoilRoot>
      <MuiThemeProvider theme={muiTheme}>
        <ChakraProvider theme={theme} resetCSS>
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={enLocale}>
            <BeforeAppMount>
              <>
                {getLayout(<Component {...pageProps} />)}
                <Modals />
              </>
            </BeforeAppMount>
          </LocalizationProvider>
        </ChakraProvider>
      </MuiThemeProvider>
    </RecoilRoot>
  )
}

export default App
