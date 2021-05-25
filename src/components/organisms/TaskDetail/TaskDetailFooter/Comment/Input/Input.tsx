import React, { memo, useEffect, useState } from 'react'
import { Editor, EditorContent } from 'src/components/organisms'
import { Flex } from 'src/components/atoms'
import { Container } from './Container'
import { Provider, useInput } from './Provider'
import { ToolBar } from './ToolBar'
import { Placeholder } from './Placeholder'
import { uuid } from 'src/shared/uuid'

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
  const { onChangeDescription, feed } = useInput()
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
          <ToolBar />
        </Editor>
      </Container>
    </Flex>
  )
})
