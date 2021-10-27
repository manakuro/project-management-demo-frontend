import React, { memo, useCallback } from 'react'
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
      <Component {...props} />
    </Provider>
  )
})

const Component: React.FC<Props> = memo<Props>((props) => {
  const { projectId } = props
  const { project, setProject } = useProject(projectId)

  const handleChange = useCallback(
    async (val: string) => {
      await setProject({ description: val })
    },
    [setProject],
  )

  return (
    <Container>
      <Editor onChange={handleChange} value={project.description}>
        <Flex flex={1} flexDirection="column">
          <EditorContent style={{ minHeight: '80px' }} />
          <Placeholder />
        </Flex>
        <ToolBar />
      </Editor>
    </Container>
  )
})
Component.displayName = 'Component'
Description.displayName = 'Description'
