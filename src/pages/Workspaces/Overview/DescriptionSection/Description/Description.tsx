import isEqual from 'lodash-es/isEqual'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Flex, Skeleton, Stack } from 'src/components/atoms'
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
        description,
      })
    },
    [setWorkspace, workspace.description],
  )

  useEffect(() => {
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
  const [loading, setLoading] = useState<boolean>(true)

  const handleChange = useCallback(
    (val: string) => {
      onChange(val)
    },
    [onChange],
  )

  const handleRendered = useCallback(() => {
    setTimeout(() => {
      setLoading(false)
    }, 200)
  }, [])

  return (
    <Container>
      <Editor
        onChange={handleChange}
        initialValue={initialValue}
        forceUpdate={forceUpdate}
      >
        <Flex flex={1} flexDirection="column" position="relative" minH="150px">
          <EditorContent
            style={{ minHeight: '150px' }}
            onRendered={handleRendered}
          />
          {loading && (
            <Flex
              position="absolute"
              top={0}
              left={0}
              w="full"
              h="full"
              bg="white"
              zIndex={1}
            >
              <Stack spacing={4} flex={1}>
                <Skeleton h="16px" w="full" borderRadius="full" />
                <Skeleton h="16px" w="70%" borderRadius="full" />
                <Skeleton h="16px" w="60%" borderRadius="full" />
                <Skeleton h="16px" w="40%" borderRadius="full" />
              </Stack>
            </Flex>
          )}
          <Placeholder />
        </Flex>
      </Editor>
    </Container>
  )
})
DescriptionHandler.displayName = 'DescriptionHandler'
Component.displayName = 'Component'
Description.displayName = 'Description'
