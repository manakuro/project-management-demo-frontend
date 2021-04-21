import { NodeSpec } from 'prosemirror-model'

type Attrs = {
  name: string
}

export const mention: NodeSpec = {
  group: 'inline',
  inline: true,
  atom: true,
  attrs: {
    name: { default: '' },
  },
  selectable: false,
  draggable: false,
  toDOM: (node) => {
    const attrs = node.attrs as Attrs

    return [
      'span',
      {
        'data-mention-name': attrs.name,
      },
      attrs.name,
    ]
  },

  parseDOM: [
    {
      tag: 'span[data-mention-id][data-mention-name][data-mention-email]',
      // @ts-ignore
      getAttrs: (element: HTMLSpanElement): Attrs => {
        const name = element.getAttribute('data-mention-name') ?? ''
        return {
          name,
        }
      },
    },
  ],
}
