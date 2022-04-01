import isEqual from 'lodash-es/isEqual'
import { EditorDescription } from 'src/graphql/types'
import { omit } from 'src/shared/utils/omit'

export const isDescriptionEqual = (
  value: EditorDescription,
  other: EditorDescription,
): boolean => {
  if (!value || !other) return false

  const description1 = omit(value, '__typename' as any)
  const description2 = omit(other, '__typename' as any)

  return isEqual(description1, description2)
}
