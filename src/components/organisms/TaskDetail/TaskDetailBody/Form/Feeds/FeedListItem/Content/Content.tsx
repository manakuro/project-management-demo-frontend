import React, { memo } from 'react'
import { Flex } from 'src/components/atoms'
import { Editor, EditorContent } from 'src/components/organisms'

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

export const Content: React.VFC<Props> = memo<Props>(() => {
  return (
    <Flex mt={2}>
      <Editor value={initialValue} editable={() => false}>
        <EditorContent />
      </Editor>
    </Flex>
  )
})
Content.displayName = 'Content'
