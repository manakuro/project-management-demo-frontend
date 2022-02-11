import isEqual from 'lodash-es/isEqual'
import React, { memo, useCallback, useMemo, useState } from 'react'
import { Editor, EditorContent } from 'src/components/organisms/Editor'
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

export const Description: React.FC<Props> = (props) => {
  return (
    <Provider>
      <DescriptionHandler {...props} />
    </Provider>
  )
}

const DescriptionHandler: React.FC<Props> = memo<Props>((props) => {
  const { task, setTask } = useTask(props.taskId)
  const initialValue = useMemo(
    () => stringifyDescription(task.description),
    [task.description],
  )
  const [forceUpdate] = useState<number>(1)

  const handleChange = useCallback(
    async (val: string) => {
      const description = parseDescription(val)
      if (isEqual(description, task.description)) return

      console.log('change!')
      await setTask({
        description,
      })
    },
    [setTask, task.description],
  )

  // useEffect(() => {
  //   setForceUpdate((s) => s + 1)
  // }, [hasDescriptionUpdated])

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
    <Row>
      <Label>Description</Label>
      <Content>
        <Container>
          <Editor
            onChange={handleChange}
            initialValue={initialValue}
            forceUpdate={forceUpdate}
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
