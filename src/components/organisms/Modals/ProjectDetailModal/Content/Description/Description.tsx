import React, { memo, useState } from 'react'
import { Editor, EditorContent } from 'src/components/organisms/Editor'
import { Container } from './Container'
import { Placeholder } from './Placeholder'
import { Provider } from './Provider'
import { ToolBar } from './ToolBar'

type Props = {}

const initialValue = JSON.stringify(
  {
    type: 'doc',
    content: [
      { type: 'paragraph', content: [{ type: 'text', text: '😜' }] },
      { type: 'paragraph', content: [{ type: 'text', text: 'テキスト2' }] },
    ],
  },
  null,
  2,
)
export const Description: React.FC<Props> = memo((props) => {
  return (
    <Provider>
      <Component {...props} />
    </Provider>
  )
})

const Component: React.FC<Props> = memo<Props>(() => {
  const [value, setValue] = useState(initialValue)

  console.log(JSON.parse(value))
  return (
    <Container>
      <Editor onChange={setValue} value={initialValue}>
        <EditorContent style={{ minHeight: '200px' }} />
        <Placeholder />
        <ToolBar />
      </Editor>
    </Container>
  )
})
Description.displayName = 'Description'
