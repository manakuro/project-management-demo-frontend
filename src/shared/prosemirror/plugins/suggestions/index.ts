import { suggest } from 'prosemirror-suggest'
import { suggestMention } from './suggestMention'
import { suggestEmoji } from './suggestEmoji'

export const suggestionPlugin = () => suggest(suggestMention, suggestEmoji)
