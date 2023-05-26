import { ChakraProvider } from '@chakra-ui/react'
import enLocale from 'date-fns/locale/en-US'
import React, { Suspense } from 'react'
import { RecoilRoot } from 'recoil'
import { Modals } from 'src/components/features/organisms/Modals'
import { GlobalQuery } from 'src/components/shared/app'
import { PageLoader } from 'src/components/ui/molecules'
import { ApolloProvider } from 'src/shared/apollo/ApolloProvider'
import {
  AdapterDateFns,
  LocalizationProvider,
  muiTheme,
  MuiThemeProvider,
} from 'src/shared/materialUI'
import { theme } from 'src/styles'

export const Provider: React.FCWithChildren = (props) => {
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
