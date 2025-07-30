import { ChakraProvider } from '@chakra-ui/react';
import { resetServerContext } from '@hello-pangea/dnd';
import enLocale from 'date-fns/locale/en-US';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { ReactElement } from 'react';
import type { GetLayout } from 'src/@types/next';
import { Modals } from 'src/components/features/organisms/Modals';
import { GlobalQuery, Subscription } from 'src/components/shared/app';
import { PageLoader } from 'src/components/ui/molecules';
import { LayoutDefault } from 'src/components/ui/organisms/Layout';
import { Mobile } from 'src/components/ui/organisms/Mobile';
import { AuthProvider, useAuthContext } from 'src/providers/AuthProvider';
import { ApolloProvider } from 'src/shared/apollo/ApolloProvider';
import {
  AdapterDateFns,
  LocalizationProvider,
  MuiThemeProvider,
  muiTheme,
} from 'src/shared/materialUI';
import { theme } from 'src/styles';

resetServerContext();

type NextPageWithLayout = NextPage & GetLayout;

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function App(props: AppPropsWithLayout) {
  return (
    <AuthProvider>
      <MuiThemeProvider theme={muiTheme}>
        <ChakraProvider theme={theme} resetCSS>
          <LocalizationProvider
            dateAdapter={AdapterDateFns as any}
            locale={enLocale}
          >
            <Mobile>
              <Inner {...props} />
            </Mobile>
          </LocalizationProvider>
        </ChakraProvider>
      </MuiThemeProvider>
    </AuthProvider>
  );
}

function Inner({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ||
    ((page: ReactElement) => <LayoutDefault>{page}</LayoutDefault>);

  const { idToken } = useAuthContext();
  if (!idToken) {
    return <PageLoader />;
  }

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
  );
}

export default App;
