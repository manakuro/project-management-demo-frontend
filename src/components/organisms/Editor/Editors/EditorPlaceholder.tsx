import React, { useMemo } from 'react'
import { Flex, FlexProps, Text } from 'src/components/atoms'
import { useEditorView } from './EdiorProvider'
import { isContentEmpty } from 'src/shared/prosemirror/utils'

type Props = FlexProps
export const EditorPlaceholder: React.FC<Props> = React.memo<Props>((props) => {
  const { children, ...rest } = props
  const view = useEditorView()

  const show = useMemo(() => {
    if (!view) return true

    return isContentEmpty(view)
  }, [view])

  if (!show) return null

  return (
    <Flex
      position="absolute"
      top={0}
      left={0}
      w="full"
      h="full"
      pointerEvents="none"
      alignItems="center"
      {...rest}
    >
      <Text fontSize="sm" color="text.muted">
        {children}
      </Text>
    </Flex>
  )
})
EditorPlaceholder.displayName = 'EditorPlaceholder'
