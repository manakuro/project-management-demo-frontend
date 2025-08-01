import {
  baseKeys,
  editorKeys,
  history,
  listKeys,
  rules,
  suggestionPlugin,
} from '@/shared/prosemirror/plugins';

export const plugins = () => [
  suggestionPlugin(),
  history(),
  listKeys(),
  editorKeys(),
  baseKeys(),
  rules(),
];
