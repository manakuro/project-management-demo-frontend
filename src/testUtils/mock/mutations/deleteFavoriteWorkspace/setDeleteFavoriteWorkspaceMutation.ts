// Generated by `yarn new:mutationMock`
import { server } from '../../server'
import { deleteFavoriteWorkspaceMutation } from '../deleteFavoriteWorkspace'
import { Options } from './type'

export const setDeleteFavoriteWorkspaceMutation = (options: Options) => {
  server.use(deleteFavoriteWorkspaceMutation(options))
}
