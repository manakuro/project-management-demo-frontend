import React, { memo, useState } from 'react'
import 'prosemirror-view/style/prosemirror.css'
import { Editor, EditorContent } from 'src/components/organisms'
import { Flex } from 'src/components/atoms'
import { Container } from './Container'
import { Provider } from './Provider'
import { ToolBar } from './ToolBar'

type Props = {}

const initialValue = JSON.stringify(
  {
    type: 'doc',
    content: [
      // { type: 'paragraph', content: [{ type: 'text', text: '😜' }] },
      // { type: 'paragraph', content: [{ type: 'text', text: 'テキスト2' }] },
    ],
  },
  null,
  2,
)

export const Input: React.FC<Props> = (props) => {
  return (
    <Provider>
      <Component {...props} />
    </Provider>
  )
}

const Component: React.FC<Props> = memo<Props>(() => {
  const [value, setValue] = useState(initialValue)

  console.log(JSON.parse(value))
  return (
    <Flex ml={2} flex={1}>
      <Container>
        <Editor onChange={setValue} value={initialValue}>
          <EditorContent />
          <ToolBar />
        </Editor>
      </Container>
    </Flex>
  )
})
