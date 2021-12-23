import { from } from 'src/libs/apollo/client'
import { createErrorLink } from './createErrorLink'
import { createHttpLink, CreateHttpProps } from './createHttpLink'

export type CreateLinkProps = CreateHttpProps
export const createLink = (props: CreateLinkProps) => {
  return from([createErrorLink(), createHttpLink(props)])
}
