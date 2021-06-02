import React, { memo, useEffect, useMemo, useState } from 'react'
import { Editor, EditorContent } from 'src/components/organisms'
import { Container } from './Container'
import { ToolBar } from './ToolBar'
import { uuid } from 'src/shared/uuid'
import { useFeedListItem } from 'src/components/organisms/TaskDetail/TaskDetailBody/Form/FeedList/FeedListItem/Provider'

type Props = {}

export const ContentText: React.VFC<Props> = memo<Props>(() => {
  const { feed, editable, onChangeDescription, description } = useFeedListItem()
  const [forceUpdate, setForceUpdate] = useState<() => string>(() => () => '')
  const value = useMemo(() => {
    return editable() ? description : feed.description
  }, [description, editable, feed.description])

  useEffect(() => {
    setForceUpdate(() => () => uuid())
  }, [editable, feed.description])

  return (
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
  )
})
ContentText.displayName = 'ContentText'