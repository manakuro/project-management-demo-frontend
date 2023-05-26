import React, { memo } from 'react'
import { Button, Flex, Stack } from 'src/components/ui/atoms'
import {
  Format,
  Emoji,
  AtMention,
} from 'src/components/ui/organisms/Editor/ToolBar'
import { transitions } from 'src/styles'
import { useInputContext } from '../Provider'
import { Attachment } from './Attachment'

type Props = {}

export const ToolBar: React.FC<Props> = memo<Props>(() => {
  const { focused, onSave } = useInputContext()

  return (
    <Flex
      marginTop="auto"
      h={focused ? 9 : 0}
      transition={transitions.base('height')}
      overflow="hidden"
    >
      <Stack direction="row" spacing={1} alignItems="center">
        <>
          <Format />
          <AtMention />
          <Emoji />
          <Attachment />
        </>
      </Stack>
      <Button colorScheme="teal" ml="auto" size="sm" onClick={onSave}>
        Comment
      </Button>
    </Flex>
  )
})
ToolBar.displayName = 'ToolBar'
