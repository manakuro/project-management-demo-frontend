import React, { memo, useState } from 'react'
import { Row, Label, Content } from '../Row'
import 'prosemirror-view/style/prosemirror.css'
import { Editor } from 'src/components/organisms'

type Props = {}

const initialValue = JSON.stringify(
  {
    type: 'doc',
    content: [
      { type: 'paragraph' },
      {
        type: 'list',
        attrs: { type: 'ordered', start: 1 },
        content: [
          {
            type: 'listItem',
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    marks: [
                      { type: 'bold' },
                      { type: 'italic' },
                      { type: 'strikethrough' },
                      { type: 'underline' },
                    ],
                    text: 'Hey',
                  },
                ],
              },
              {
                type: 'list',
                attrs: { type: 'ordered', start: 1 },
                content: [
                  {
                    type: 'listItem',
                    content: [
                      { type: 'paragraph' },
                      {
                        type: 'list',
                        attrs: { type: 'ordered', start: 1 },
                        content: [
                          {
                            type: 'listItem',
                            content: [
                              {
                                type: 'paragraph',
                                content: [{ type: 'text', text: 'test' }],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      { type: 'paragraph' },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            marks: [
              { type: 'bold' },
              { type: 'link', attrs: { href: 'd', title: null } },
            ],
            text: 'Paragra',
          },
          { type: 'text', marks: [{ type: 'bold' }], text: 'ph' },
        ],
      },
      { type: 'paragraph' },
      { type: 'paragraph' },
      {
        type: 'blockquote',
        content: [{ type: 'text', text: 'A blockquote here' }],
      },
    ],
  },
  null,
  2,
)
export const Description: React.FC<Props> = memo<Props>(() => {
  const [value, setValue] = useState(initialValue)

  console.log('value: ', JSON.parse(value))

  return (
    <Row>
      <Label>Description</Label>
      <Content>
        <Editor onChange={setValue} value={initialValue} />
      </Content>
    </Row>
  )
})
