import { ChakraProvider } from '@chakra-ui/react'
import enLocale from 'date-fns/locale/en-US'
import React from 'react'
import { RecoilRoot } from 'recoil'
import { Modals } from 'src/components/organisms/Modals'
import { ApolloProvider } from 'src/shared/apollo/ApolloProvider'
import { BeforeAppMount } from 'src/shared/app/'
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
            <ApolloProvider>
              <BeforeAppMount>
                {props.children}
                <Modals />
              </BeforeAppMount>
            </ApolloProvider>
          </LocalizationProvider>
        </ChakraProvider>
      </MuiThemeProvider>
    </RecoilRoot>
  )
}
