import { ChakraProvider } from '@chakra-ui/react'
import enLocale from 'date-fns/locale/en-US'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import React, { ReactElement, useEffect } from 'react'
import { resetServerContext } from 'react-beautiful-dnd'
import { RecoilRoot } from 'recoil'
import { GetLayout } from 'src/@types/next'
import { PageLoader } from 'src/components/molecules'
import { LayoutDefault } from 'src/components/organisms/Layout'
import { Modals } from 'src/components/organisms/Modals'
import { useAuth } from 'src/hooks/useAuth'
import { ApolloProvider } from 'src/shared/apollo/ApolloProvider'
import { BeforeAppMount } from 'src/shared/app'
import { Subscription } from 'src/shared/app/Subscription'
import {
  muiTheme,
  MuiThemeProvider,
  LocalizationProvider,
  AdapterDateFns,
} from 'src/shared/materialUI'
import { useGlobalUILoading } from 'src/store/app/globalUI/loading'
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
            <Inner {...props} />
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

  const { loading, endLoading } = useGlobalUILoading()
  const { isSignedIn } = useAuth()

  useEffect(() => {
    if (isSignedIn) {
      endLoading()
    }
  }, [endLoading, isSignedIn])

  if (loading) return <PageLoader />

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
