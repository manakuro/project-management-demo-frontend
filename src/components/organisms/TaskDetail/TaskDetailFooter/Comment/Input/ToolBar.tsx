import React, { memo } from 'react'
import {
  Format,
  Emoji,
  AtMention,
} from 'src/components/organisms/Editor/ToolBar'
import { Button, Flex, Stack } from 'src/components/atoms'
import { useInput } from './Provider'
import { transitions } from 'src/styles'

type Props = {}

export const ToolBar: React.FC<Props> = memo<Props>(() => {
  const { focused } = useInput()

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
        </>
      </Stack>
      <Button colorScheme="teal" ml="auto" size="sm">
        Comment
      </Button>
    </Flex>
  )
})
ToolBar.displayName = 'ToolBar'
