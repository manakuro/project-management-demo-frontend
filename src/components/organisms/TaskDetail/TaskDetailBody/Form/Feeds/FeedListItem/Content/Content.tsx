import React, { memo, useEffect, useMemo, useState } from 'react'
import { Flex } from 'src/components/atoms'
import { Editor, EditorContent } from 'src/components/organisms'
import { useFeedListItem } from '../Provider'
import { Container } from './Container'
import { ToolBar } from './ToolBar'
import { uuid } from 'src/shared/uuid'

type Props = {}

export const Content: React.VFC<Props> = memo<Props>(() => {
  const { feed, editable, onChangeDescription, description } = useFeedListItem()
  const [forceUpdate, setForceUpdate] = useState<string>('')
  const value = useMemo(() => {
    return editable() ? description : feed.description
  }, [description, editable, feed.description])

  useEffect(() => {
    setForceUpdate(uuid())
  }, [editable, feed.description])

  return (
    <Flex mt={2} flexDirection="column">
      <Container>
        <Editor
          value={value}
          editable={editable}
          onChange={onChangeDescription}
          forceUpdate={forceUpdate}
        >
          <EditorContent />
          <ToolBar />
        </Editor>
      </Container>
    </Flex>
  )
})
Content.displayName = 'Content'
