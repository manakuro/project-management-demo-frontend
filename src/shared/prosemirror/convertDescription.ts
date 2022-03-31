import {
  EditorDescription,
  EditorDescriptionContent,
  EditorDescriptionContentContent,
} from 'src/graphql/types'
import { getDefaultDescription } from './getDefaultDescription'

export const parseDescription = <T extends EditorDescription>(
  val: string,
): T => {
  let parsed
  try {
    parsed = JSON.parse(val) as T
  } catch (e) {
    if (e instanceof Error) {
      console.log('parseDescription error: ', e)
    }
    throw e
  }

  if (!('content' in parsed)) parsed.content = []

  parsed.content = (parsed.content as EditorDescriptionContent[]).map((c) => {
    if (!('content' in c)) return { ...c, content: null }
    if (Array.isArray(c.content)) {
      const content = (c.content as EditorDescriptionContentContent[]).map(
        (cc) => {
          let result = cc
          if (!('attrs' in cc))
            result = { ...result, attrs: { mentionId: '', mentionType: '' } }

          if (!('text' in cc)) result = { ...result, text: '' }

          return result
        },
      )
      return {
        ...c,
        content,
      }
    }
    return c
  })

  return parsed
}

export const stringifyDescription = <T extends EditorDescription>(
  val: T,
): string => {
  try {
    return val ? JSON.stringify(val) : JSON.stringify(getDefaultDescription())
  } catch (e) {
    if (e instanceof Error) {
      console.log('stringifyDescription error: ', e)
    }
    throw e
  }
}
