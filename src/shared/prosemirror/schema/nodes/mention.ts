import { NodeSpec } from 'prosemirror-model'

type Attrs = {
  teammateId: string
}
export type MentionAttrs = Attrs

export const mention: NodeSpec = {
  group: 'inline',
  inline: true,
  atom: true,
  attrs: {
    teammateId: { default: '' },
  },
  selectable: false,
  draggable: false,
  toDOM: (node) => {
    const attrs = node.attrs as Attrs

    return [
      'span',
      {
        'data-mention-teammateId': attrs.teammateId,
      },
    ]
  },

  parseDOM: [
    {
      tag: 'span[data-mention-teammateId]',
      // @ts-ignore
      getAttrs: (element: HTMLSpanElement): Attrs => {
        const teammateId = element.getAttribute('data-mention-teammateId') ?? ''
        return {
          teammateId,
        }
      },
    },
  ],
}
