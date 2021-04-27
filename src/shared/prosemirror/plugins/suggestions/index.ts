import { suggest } from 'prosemirror-suggest'
import { suggestMention } from './suggestMention'

export const suggestionPlugin = suggest(suggestMention)
