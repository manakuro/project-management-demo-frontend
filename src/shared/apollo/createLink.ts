import { from } from 'src/libs/apollo/client'
import { createErrorLink } from './createErrorLink'
import { createHttpLink, CreateHttpProps } from './createHttpLink'
import { removeTypeName } from './removeTypename'

export type CreateLinkProps = CreateHttpProps
export const createLink = (props: CreateLinkProps) => {
  return from([removeTypeName, createErrorLink(), createHttpLink(props)])
}
