import React, { memo, useState } from 'react'
import 'prosemirror-view/style/prosemirror.css'
import { Editor } from 'src/components/organisms'
import { Flex } from 'src/components/atoms'

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
export const Input: React.FC<Props> = memo<Props>(() => {
  const [value, setValue] = useState(initialValue)

  console.log(JSON.parse(value))
  return (
    <Flex ml={2} flex={1}>
      <Editor onChange={setValue} value={initialValue} />
    </Flex>
  )
})
