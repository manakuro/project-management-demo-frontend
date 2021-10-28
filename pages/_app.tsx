import { ChakraProvider } from '@chakra-ui/react'
import enLocale from 'date-fns/locale/en-US'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import React, { ReactElement } from 'react'
import { resetServerContext } from 'react-beautiful-dnd'
import { RecoilRoot } from 'recoil'
import { GetLayout } from 'src/@types/next'
import { LayoutDefault } from 'src/components/organisms/Layout'
import { Modals } from 'src/components/organisms/Modals'
import { BeforeAppMount } from 'src/shared/app'
import {
  muiTheme,
  MuiThemeProvider,
  LocalizationProvider,
  AdapterDateFns,
} from 'src/shared/materialUI'
import { theme } from 'src/styles'

resetServerContext()

type NextPageWithLayout = NextPage & GetLayout

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout =
    Component.getLayout ||
    ((page: ReactElement) => <LayoutDefault>{page}</LayoutDefault>)

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
