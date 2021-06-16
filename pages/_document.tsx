import { ColorModeScript } from '@chakra-ui/react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import React from 'react'
import { theme } from 'src/styles'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" type="image/png" href="/icon/icon-192x192.png" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/icon/apple-touch-icon-180x180.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="128x128"
            href="/icon/android-chrome-128x128.png"
          />
          <link rel="manifest" href="/icon/manifest.json" />
          <link
            rel="preload stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:400,500,600,700|Poppins:300,400,600,700&display=swap"
            as="style"
          />
        </Head>
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
