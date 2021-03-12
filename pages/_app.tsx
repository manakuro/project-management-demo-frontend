import React from 'react'
import { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from 'src/styles'
import { Modals } from 'src/components/organisms'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import enLocale from 'date-fns/locale/en-US'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <ChakraProvider theme={theme} resetCSS>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={enLocale}>
          <>
            <Component {...pageProps} />
            <Modals />
          </>
        </MuiPickersUtilsProvider>
      </ChakraProvider>
    </RecoilRoot>
  )
}

export default App
