import React, { memo, useCallback, useRef } from 'react'
import { Flex } from 'src/components/atoms'
import { Editor, EditorContent } from 'src/components/organisms/Editor'
import { useProject } from 'src/store/entities/projects'
import { Container } from './Container'
import { Placeholder } from './Placeholder'
import { Provider } from './Provider'
import { ToolBar } from './ToolBar'

type Props = {
  projectId: string
}

export const Description: React.FC<Props> = memo((props) => {
  return (
    <Provider>
      <DescriptionHandler {...props} />
    </Provider>
  )
})

const DescriptionHandler: React.FC<Props> = memo<Props>((props) => {
  const { projectId } = props
  const { project, setProject } = useProject(projectId)
  const initialValue = useRef(project.description)

  const handleChange = useCallback(
    async (val: string) => {
      await setProject({ description: val })
    },
    [setProject],
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
        <ToolBar />
      </Editor>
    </Container>
  )
})
DescriptionHandler.displayName = 'DescriptionHandler'
Component.displayName = 'Component'
Description.displayName = 'Description'
