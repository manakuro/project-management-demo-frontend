import React, { memo, useCallback } from 'react'
import { Flex } from 'src/components/atoms'
import { Editor, EditorContent } from 'src/components/organisms'
import { useFeedListItem } from '../Provider'

type Props = {}

export const Content: React.VFC<Props> = memo<Props>(() => {
  const { feed } = useFeedListItem()

  const editable = useCallback(() => false, [])

  return (
    <Flex mt={2}>
      <Editor value={feed.description} editable={editable}>
        <EditorContent />
      </Editor>
    </Flex>
  )
})
Content.displayName = 'Content'
