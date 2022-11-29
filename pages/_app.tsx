import { ChakraProvider } from '@chakra-ui/react'
import { resetServerContext } from '@hello-pangea/dnd'
import enLocale from 'date-fns/locale/en-US'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import React, { ReactElement, Suspense } from 'react'
import { RecoilRoot } from 'recoil'
import { GetLayout } from 'src/@types/next'
import { PageLoader } from 'src/components/molecules'
import { LayoutDefault } from 'src/components/organisms/Layout'
import { Mobile } from 'src/components/organisms/Mobile'
import { Modals } from 'src/components/organisms/Modals'
import { BeforeAppMount, Subscription } from 'src/components/shared/app'
import { ApolloProvider } from 'src/shared/apollo/ApolloProvider'
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

const App = (props: AppPropsWithLayout) => {
  return (
    <RecoilRoot>
      <MuiThemeProvider theme={muiTheme}>
        <ChakraProvider theme={theme} resetCSS>
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={enLocale}>
            <Mobile>
              <Suspense fallback={<PageLoader />}>
                <Inner {...props} />
              </Suspense>
            </Mobile>
          </LocalizationProvider>
        </ChakraProvider>
      </MuiThemeProvider>
    </RecoilRoot>
  )
}

const Inner = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout =
    Component.getLayout ||
    ((page: ReactElement) => <LayoutDefault>{page}</LayoutDefault>)

  return (
    <ApolloProvider>
      <BeforeAppMount>
        <Subscription>
          <>
            {getLayout(<Component {...pageProps} />)}
            <Modals />
          </>
        </Subscription>
      </BeforeAppMount>
    </ApolloProvider>
  )
}

export default App
