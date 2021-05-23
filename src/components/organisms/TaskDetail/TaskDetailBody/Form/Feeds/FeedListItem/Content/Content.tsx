import React, { memo } from 'react'
import { Flex } from 'src/components/atoms'
import { Editor, EditorContent } from 'src/components/organisms'
import { useFeedListItem } from '../Provider'
import { Container } from './Container'
import { ToolBar } from './ToolBar'

type Props = {}

export const Content: React.VFC<Props> = memo<Props>(() => {
  const { feed, editable } = useFeedListItem()

  return (
    <Flex mt={2} flexDirection="column">
      <Container>
        <Editor value={feed.description} editable={editable}>
          <EditorContent />
          <ToolBar />
        </Editor>
      </Container>
    </Flex>
  )
})
Content.displayName = 'Content'
