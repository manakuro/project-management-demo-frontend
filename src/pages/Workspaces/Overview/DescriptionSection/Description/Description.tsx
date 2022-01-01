import isEqual from 'lodash-es/isEqual'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Flex } from 'src/components/atoms'
import { Editor, EditorContent } from 'src/components/organisms/Editor'
import {
  parseDescription,
  stringifyDescription,
} from 'src/shared/prosemirror/convertDescription'
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
  const { workspace, hasDescriptionUpdated } = useWorkspace()
  const { setWorkspace } = useWorkspaceCommand()
  const initialValue = useMemo(
    () => stringifyDescription(workspace.description),
    [workspace.description],
  )
  const [forceUpdate, setForceUpdate] = useState<number>(1)

  const handleChange = useCallback(
    async (val: string) => {
      const description = parseDescription(val)
      if (isEqual(description, workspace.description)) return

      console.log('change!')
      await setWorkspace({
        description: parseDescription(val),
      })
    },
    [setWorkspace, workspace.description],
  )

  useEffect(() => {
    console.log('updated!')
    setForceUpdate((s) => s + 1)
  }, [hasDescriptionUpdated])

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
  forceUpdate: number
}
const Component: React.FC<ComponentProps> = memo<ComponentProps>((props) => {
  const { onChange, initialValue, forceUpdate } = props

  const handleChange = useCallback(
    (val: string) => {
      onChange(val)
    },
    [onChange],
  )

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
