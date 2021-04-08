import { strikethrough, underline } from './marks'
import { Schema } from 'prosemirror-model'
import { marks, nodes } from 'prosemirror-schema-basic'

export const schema = new Schema({
  marks: {
    ...marks,
    underline,
    strikethrough,
  },
  nodes,
})
