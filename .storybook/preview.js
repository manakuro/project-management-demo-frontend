import {Provider} from "../src/storybook/Provider";
import { RouterContext } from "next/dist/shared/lib/router-context";
import * as msw from 'msw-storybook-addon';
import {handlers as queryHandlers} from "../src/mocks/queries/handlers";
import {handlers as mutationHandlers} from "../src/mocks/mutations/handlers";

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

export const decorators = [
  msw.mswDecorator,
  (Story) => (
    <Provider>
      <Story />
    </Provider>
  ),
];
