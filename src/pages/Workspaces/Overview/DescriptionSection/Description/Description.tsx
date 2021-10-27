import React, { memo, useCallback, useRef } from 'react'
import { Flex } from 'src/components/atoms'
import { Editor, EditorContent } from 'src/components/organisms/Editor'
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
  const { workspace } = useWorkspace()
  const { setWorkspace } = useWorkspaceCommand()
  const initialValue = useRef(workspace.description)

  const handleChange = useCallback(
    async (val: string) => {
      await setWorkspace({ description: val })
    },
    [setWorkspace],
  )

  return (
    <Component onChange={handleChange} initialValue={initialValue.current} />
  )
})

type ComponentProps = {
  onChange: (val: string) => void
  initialValue: string
}
const Component: React.FC<ComponentProps> = memo<ComponentProps>((props) => {
  const { onChange, initialValue } = props

  const handleChange = useCallback(
    (val: string) => {
      console.log('change!')
      onChange(val)
    },
    [onChange],
  )

  return (
    <Container>
      <Editor onChange={handleChange} initialValue={initialValue}>
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
