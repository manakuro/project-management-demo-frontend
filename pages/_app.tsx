import React from 'react'
import { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from 'src/styles'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <ChakraProvider theme={theme} resetCSS>
        <Component {...pageProps} />
      </ChakraProvider>
    </RecoilRoot>
  )
}

export default App
