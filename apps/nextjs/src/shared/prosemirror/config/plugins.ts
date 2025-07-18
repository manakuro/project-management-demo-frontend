import {
  baseKeys,
  editorKeys,
  history,
  listKeys,
  rules,
  suggestionPlugin,
} from 'src/shared/prosemirror/plugins';

export const plugins = () => [
  suggestionPlugin(),
  history(),
  listKeys(),
  editorKeys(),
  baseKeys(),
  rules(),
];
