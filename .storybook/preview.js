import {Provider} from "../src/storybook/Provider";
import { RouterContext } from "next/dist/shared/lib/router-context";
import * as msw from 'msw-storybook-addon';
import {handlers as queryHandlers} from "../src/mocks/queries/handlers";
import {handlers as mutationHandlers} from "../src/mocks/mutations/handlers";
import mockdate from 'mockdate'
import { dateFns } from '../src/shared/dateFns'

msw.initialize()

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
  msw: {
    handlers: [...queryHandlers, ...mutationHandlers]
  }
}

export const mockDateDecorator = (Story, { parameters }) => {
  const date = parameters.mockDate ?? '2022-11-29T09:16:39+09:00'

  mockdate.set(date)

  const mockedDate = dateFns.format(new Date(date), 'HH:mm:ss dd/MM/yy')
  console.log('[Mocked date]: ', mockedDate)

  return (
    <Story />
  )
}


export const decorators = [
  msw.mswDecorator,
  mockDateDecorator,
  (Story) => (
    <Provider>
      <Story />
    </Provider>
  ),
];



