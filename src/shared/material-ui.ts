import { createMuiTheme } from '@material-ui/core'
export * from '@material-ui/lab'
export { ThemeProvider as MuiThemeProvider } from '@material-ui/core'

export const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#4FD1C5',
      dark: '#4FD1C5',
    },
  },
})
