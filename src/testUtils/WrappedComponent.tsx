import { RecoilRoot } from 'recoil'
import {
  AdapterDateFns,
  LocalizationProvider,
  muiTheme,
  MuiThemeProvider,
} from 'src/shared/material-ui'
import React from 'react'
import { theme } from 'src/styles'
import { ChakraProvider } from '@chakra-ui/react'
import enLocale from 'date-fns/locale/en-US'
import { Modals } from 'src/components/organisms'
import { BeforeAppMount } from 'src/shared/beforeAppMount'

export const WrappedComponent: React.FC = (props) => {
  return (
    <RecoilRoot>
      <MuiThemeProvider theme={muiTheme}>
        <ChakraProvider theme={theme} resetCSS>
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={enLocale}>
            <BeforeAppMount>
              <>
                {props.children}
                <Modals />
              </>
            </BeforeAppMount>
          </LocalizationProvider>
        </ChakraProvider>
      </MuiThemeProvider>
    </RecoilRoot>
  )
}
