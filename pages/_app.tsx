import { ChakraProvider } from '@chakra-ui/react'
import { resetServerContext } from '@hello-pangea/dnd'
import enLocale from 'date-fns/locale/en-US'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import React, { ReactElement, Suspense } from 'react'
import { RecoilRoot } from 'recoil'
import { GetLayout } from 'src/@types/next'
import { Modals } from 'src/components/features/organisms/Modals'
import { GlobalQuery, Subscription } from 'src/components/shared/app'
import { PageLoader } from 'src/components/ui/molecules'
import { LayoutDefault } from 'src/components/ui/organisms/Layout'
import { Mobile } from 'src/components/ui/organisms/Mobile'
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
      <GlobalQuery>
        <Subscription>
          <>
            {getLayout(<Component {...pageProps} />)}
            <Modals />
          </>
        </Subscription>
      </GlobalQuery>
    </ApolloProvider>
  )
}

export default App
