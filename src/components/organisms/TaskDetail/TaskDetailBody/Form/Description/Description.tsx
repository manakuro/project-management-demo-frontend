import React, { memo, useState } from 'react'
import { Editor, EditorContent } from 'src/components/organisms'
import { Row, Label, Content } from '../Row'
import { Container } from './Container'
import { Placeholder } from './Placeholder'
import { Provider } from './Provider'
import { ToolBar } from './ToolBar'

type Props = {}

const initialValue = JSON.stringify(
  {
    type: 'doc',
    content: [
      // {
      //   type: 'list',
      //   attrs: { type: 'ordered', start: 1 },
      //   content: [
      //     {
      //       type: 'listItem',
      //       content: [
      //         {
      //           type: 'paragraph',
      //           content: [
      //             {
      //               type: 'text',
      //               marks: [
      //                 { type: 'bold' },
      //                 { type: 'italic' },
      //                 { type: 'strikethrough' },
      //                 { type: 'underline' },
      //               ],
      //               text: 'Hey',
      //             },
      //           ],
      //         },
      //         {
      //           type: 'list',
      //           attrs: { type: 'ordered', start: 1 },
      //           content: [
      //             {
      //               type: 'listItem',
      //               content: [
      //                 { type: 'paragraph' },
      //                 {
      //                   type: 'list',
      //                   attrs: { type: 'ordered', start: 1 },
      //                   content: [
      //                     {
      //                       type: 'listItem',
      //                       content: [
      //                         {
      //                           type: 'paragraph',
      //                           content: [{ type: 'text', text: 'test' }],
      //                         },
      //                       ],
      //                     },
      //                   ],
      //                 },
      //               ],
      //             },
      //           ],
      //         },
      //       ],
      //     },
      //   ],
      // },
      // { type: 'paragraph' },
      // {
      //   type: 'paragraph',
      //   content: [
      //     {
      //       type: 'text',
      //       marks: [
      //         {
      //           type: 'link',
      //           attrs: { href: 'https://google.com', title: null },
      //         },
      //       ],
      //       text: 'test link',
      //     },
      //   ],
      // },
      // { type: 'paragraph' },
      { type: 'paragraph', content: [{ type: 'text', text: '😜' }] },
      { type: 'paragraph', content: [{ type: 'text', text: 'テキスト2' }] },
      // { type: 'paragraph' },
      // { type: 'paragraph' },
      // { type: 'paragraph' },
    ],
  },
  null,
  2,
)
export const Description: React.FC<Props> = (props) => {
  return (
    <Provider>
      <Component {...props} />
    </Provider>
  )
}

const Component: React.FC<Props> = memo<Props>(() => {
  const [, setValue] = useState(initialValue)

  // console.log(JSON.parse(value))
  return (
    <Row>
      <Label>Description</Label>
      <Content>
        <Container>
          <Editor onChange={setValue} value={initialValue}>
            <EditorContent />
            <Placeholder />
            <ToolBar />
          </Editor>
        </Container>
      </Content>
    </Row>
  )
})
