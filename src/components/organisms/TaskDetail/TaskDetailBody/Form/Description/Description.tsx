import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Editor, EditorContent } from 'src/components/organisms/Editor'
import { isDescriptionEqual } from 'src/shared/editor/isDescriptionEqual'
import {
  parseDescription,
  stringifyDescription,
} from 'src/shared/prosemirror/convertDescription'
import { useTask } from 'src/store/entities/task'
import { Row, Label, Content } from '../Row'
import { Container } from './Container'
import { Placeholder } from './Placeholder'
import { Provider } from './Provider'
import { ToolBar } from './ToolBar'

type Props = {
  taskId: string
}

export const Description: React.FC<Props> = memo<Props>((props) => {
  return (
    <Provider>
      <DescriptionHandler {...props} />
    </Provider>
  )
})

const DescriptionHandler: React.FC<Props> = memo<Props>((props) => {
  const { task, setTask, hasDescriptionUpdated } = useTask(props.taskId)
  const initialValue = useMemo(
    () => stringifyDescription(task.description),
    [task.description],
  )
  const [resetView, setResetView] = useState<number>(1)

  const handleChange = useCallback(
    async (val: string) => {
      const description = parseDescription(val)
      if (isDescriptionEqual(description, task.description)) return

      console.log('change!')
      await setTask({
        description,
      })
    },
    [setTask, task.description],
  )

  useEffect(() => {
    setResetView((s) => s + 1)
  }, [hasDescriptionUpdated])

  return (
    <Component
      onChange={handleChange}
      initialValue={initialValue}
      resetView={resetView}
    />
  )
})

type ComponentProps = {
  onChange: (val: string) => void
  initialValue: string
  resetView: number
}
const Component: React.FC<ComponentProps> = memo<ComponentProps>((props) => {
  const { onChange, initialValue, resetView } = props

  const handleChange = useCallback(
    (val: string) => {
      onChange(val)
    },
    [onChange],
  )

  return (
    <Row>
      <Label>Description</Label>
      <Content>
        <Container>
          <Editor
            onChange={handleChange}
            initialValue={initialValue}
            resetView={resetView}
          >
            <EditorContent />
            <Placeholder />
            <ToolBar />
          </Editor>
        </Container>
      </Content>
    </Row>
  )
})
DescriptionHandler.displayName = 'DescriptionHandler'
Component.displayName = 'Component'
Description.displayName = 'Description'
