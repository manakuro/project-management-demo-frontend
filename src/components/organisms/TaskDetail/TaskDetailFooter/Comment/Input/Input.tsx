import React, { memo, useEffect, useState } from 'react'
import { Flex } from 'src/components/atoms'
import { Editor, EditorContent } from 'src/components/organisms/Editor'
import { uuid } from 'src/shared/uuid'
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
  const { onChangeDescription, feed } = useInputContext()
  const [forceUpdate, setForceUpdate] = useState<() => string>(() => () => '')

  useEffect(() => {
    setForceUpdate(() => () => uuid())
  }, [feed.id])

  return (
    <Flex ml={2} flex={1}>
      <Container>
        <Editor
          onChange={onChangeDescription}
          value={initialValue}
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
