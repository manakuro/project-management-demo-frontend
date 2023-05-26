// Generated by `yarn new:queryMock`
import { server } from '../../server'
import { mentionQuery } from '../mention'
import { Options } from './type'

export const setMentionQuery = (options: Options) => {
  server.use(mentionQuery(options))
}