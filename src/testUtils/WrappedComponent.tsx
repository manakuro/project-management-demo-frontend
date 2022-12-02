import { ChakraProvider } from '@chakra-ui/react'
import enLocale from 'date-fns/locale/en-US'
import React, { Suspense } from 'react'
import { RecoilRoot } from 'recoil'
import { PageLoader } from 'src/components/molecules'
import { Modals } from 'src/components/organisms/Modals'
import { GlobalQuery } from 'src/components/shared/app'
import { ApolloProvider } from 'src/shared/apollo/ApolloProvider'
import {
  AdapterDateFns,
  LocalizationProvider,
  muiTheme,
  MuiThemeProvider,
} from 'src/shared/materialUI'
import { theme } from 'src/styles'

export const WrappedComponent: React.FCWithChildren = (props) => {
  return (
    <RecoilRoot>
      <MuiThemeProvider theme={muiTheme}>
        <ChakraProvider theme={theme} resetCSS>
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={enLocale}>
            <Suspense fallback={<PageLoader />}>
              <ApolloProvider>
                <GlobalQuery>
                  {props.children}
                  <Modals />
                </GlobalQuery>
              </ApolloProvider>
            </Suspense>
          </LocalizationProvider>
        </ChakraProvider>
      </MuiThemeProvider>
    </RecoilRoot>
  )
}
