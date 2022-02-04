import React, { memo, useEffect, useMemo, useState } from 'react'
import { Editor, EditorContent } from 'src/components/organisms/Editor'
import { stringifyDescription } from 'src/shared/prosemirror/convertDescription'
import { useTaskFeedListItemContext } from '../../Provider'
import { Container } from './Container'
import { ToolBar } from './ToolBar'

type Props = {}

export const ContentText: React.VFC<Props> = memo<Props>(() => {
  const { taskFeed, editable, onChangeDescription } =
    useTaskFeedListItemContext()
  const [forceUpdate, setForceUpdate] = useState<number>(1)
  const value = useMemo(
    () => stringifyDescription(taskFeed.description),
    [taskFeed.description],
  )

  useEffect(() => {
    setForceUpdate((s) => s + 1)
  }, [editable, taskFeed.description])

  return (
    <Container>
      <Editor
        initialValue={value}
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
