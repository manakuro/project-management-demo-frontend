import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Flex } from 'src/components/atoms'
import { Editor, EditorContent } from 'src/components/organisms/Editor'
import {
  parseDescription,
  stringifyDescription,
} from 'src/shared/prosemirror/convertDescription'
import { uuid } from 'src/shared/uuid'
import { useWorkspace, useWorkspaceCommand } from 'src/store/entities/workspace'
import { Container } from './Container'
import { Placeholder } from './Placeholder'
import { Provider } from './Provider'

type Props = {}

export const Description: React.FC<Props> = memo((props) => {
  return (
    <Provider>
      <DescriptionHandler {...props} />
    </Provider>
  )
})

const DescriptionHandler: React.FC<Props> = memo<Props>(() => {
  const { workspace, updated } = useWorkspace()
  const { setWorkspace } = useWorkspaceCommand()
  const initialValue = useMemo(
    () => stringifyDescription(workspace.description),
    [workspace.description],
  )
  const [forceUpdate, setForceUpdate] = useState<() => string>(() => () => '')

  const handleChange = useCallback(
    async (val: string) => {
      await setWorkspace({
        description: parseDescription(val),
      })
    },
    [setWorkspace],
  )

  // useEffect(() => {
  //   console.log('updated!')
  //   if (updated) setForceUpdate(() => () => uuid())
  // }, [updated])

  return (
    <Component
      onChange={handleChange}
      initialValue={initialValue}
      forceUpdate={forceUpdate}
    />
  )
})

type ComponentProps = {
  onChange: (val: string) => void
  initialValue: string
  forceUpdate: () => string
}
const Component: React.FC<ComponentProps> = memo<ComponentProps>((props) => {
  const { onChange, initialValue, forceUpdate } = props

  const handleChange = useCallback(
    (val: string) => {
      console.log('change!')
      onChange(val)
    },
    [onChange],
  )
  console.log('Component render!!!')

  return (
    <Container>
      <Editor
        onChange={handleChange}
        initialValue={initialValue}
        forceUpdate={forceUpdate}
      >
        <Flex flex={1} flexDirection="column">
          <EditorContent style={{ minHeight: '80px' }} />
          <Placeholder />
        </Flex>
      </Editor>
    </Container>
  )
})
DescriptionHandler.displayName = 'DescriptionHandler'
Component.displayName = 'Component'
Description.displayName = 'Description'
