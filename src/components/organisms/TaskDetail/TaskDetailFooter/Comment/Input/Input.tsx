import React, { memo, useEffect, useState } from 'react'
import { Flex } from 'src/components/atoms'
import { Editor, EditorContent } from 'src/components/organisms/Editor'
import { Attachments } from './Attachments'
import { Container } from './Container'
import { Placeholder } from './Placeholder'
import { Provider, useInputContext } from './Provider'
import { ToolBar } from './ToolBar'

type Props = {}

const initialValue = JSON.stringify(
  {
    type: 'doc',
    content: [],
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
  const { onChangeDescription, taskFeed } = useInputContext()
  const [forceUpdate, setForceUpdate] = useState<number>(1)

  useEffect(() => {
    setForceUpdate((s) => s + 1)
  }, [taskFeed.id])

  return (
    <Flex ml={2} flex={1}>
      <Container>
        <Editor
          onChange={onChangeDescription}
          initialValue={initialValue}
          forceUpdate={forceUpdate}
        >
          <EditorContent />
          <Placeholder />
          <Attachments />
          <ToolBar />
        </Editor>
      </Container>
    </Flex>
  )
})
Component.displayName = 'Component'
