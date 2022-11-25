import { setupServer } from 'msw/node'
import { handlers as queryHandlers } from './queries/handlers'

export const server = setupServer(...[...queryHandlers])

export const removeAllListeners = () => {
  server.events.removeAllListeners()
}
