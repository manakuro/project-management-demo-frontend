import { ApolloProvider as ApolloProviderLibs } from '@apollo/client'
import { ChakraProvider } from '@chakra-ui/react'
import enLocale from 'date-fns/locale/en-US'
import React, { useMemo } from 'react'
import { RecoilRoot } from 'recoil'
import {
  useFavoriteProjectIdsQuery,
  useFavoriteWorkspaceIdsQuery,
  useMeQuery,
  useProjectBaseColorsQuery,
  useProjectIconsQuery,
  useProjectLightColorsQuery,
  useProjectsQuery,
  useTaskPrioritiesQuery,
  useTeammateTaskTabStatusQuery,
  useWorkspaceQuery,
} from 'src/hooks/queries/entities'
import { createApolloClient } from 'src/shared/apollo/client'
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
            <ApolloProvider>
              <GlobalQuery>{props.children}</GlobalQuery>
            </ApolloProvider>
          </LocalizationProvider>
        </ChakraProvider>
      </MuiThemeProvider>
    </RecoilRoot>
  )
}

const ApolloProvider: React.FCWithChildren = (props) => {
  const client = useMemo(
    () => createApolloClient({ idToken: 'token' }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  return (
    <ApolloProviderLibs client={client}>{props.children}</ApolloProviderLibs>
  )
}

const GlobalQuery: React.FCWithChildren = (props) => {
  useTaskPrioritiesQuery()
  useProjectsQuery()
  useProjectBaseColorsQuery()
  useProjectLightColorsQuery()
  useProjectIconsQuery()
  useFavoriteWorkspaceIdsQuery()
  useWorkspaceQuery()
  useMeQuery()
  useFavoriteProjectIdsQuery()
  useTeammateTaskTabStatusQuery()

  return <>{props.children}</>
}
