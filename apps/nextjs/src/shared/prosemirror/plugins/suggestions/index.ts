import { suggest } from 'prosemirror-suggest';
import { suggestEmoji } from './suggestEmoji';
import { suggestMention } from './suggestMention';

export const suggestionPlugin = () => suggest(suggestMention, suggestEmoji);
