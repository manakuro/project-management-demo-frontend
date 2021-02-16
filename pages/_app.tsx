import React from 'react'
import { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from 'src/styles'
import { Modals } from 'src/components/organisms'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <ChakraProvider theme={theme} resetCSS>
        <>
          <Component {...pageProps} />
          <Modals />
        </>
      </ChakraProvider>
    </RecoilRoot>
  )
}

export default App
