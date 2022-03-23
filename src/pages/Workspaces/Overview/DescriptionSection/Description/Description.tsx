import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Editor, EditorContent } from 'src/components/organisms/Editor'
import { isDescriptionEqual } from 'src/shared/editor/isDescriptionEqual'
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
  const [resetView, setResetView] = useState<number>(1)

  const handleChange = useCallback(
    async (val: string) => {
      const description = parseDescription(val)
      if (isDescriptionEqual(description, workspace.description)) return

      console.log('change!')
      await setWorkspace({
        description,
      })
    },
    [setWorkspace, workspace.description],
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
    <Container>
      <Editor
        onChange={handleChange}
        initialValue={initialValue}
        resetView={resetView}
      >
        <EditorContent />
        <Placeholder />
      </Editor>
    </Container>
  )
})
DescriptionHandler.displayName = 'DescriptionHandler'
Component.displayName = 'Component'
Description.displayName = 'Description'
