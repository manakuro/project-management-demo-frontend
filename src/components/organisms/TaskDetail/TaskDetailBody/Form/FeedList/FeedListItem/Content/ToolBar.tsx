import React, { memo } from 'react'
import {
  Format,
  Emoji,
  AtMention,
} from 'src/components/organisms/Editor/ToolBar'
import { Button, Flex, Stack } from 'src/components/atoms'
import { useFeedListItem } from '../Provider'

type Props = {}

export const ToolBar: React.FC<Props> = memo<Props>(() => {
  const { editable, onCancel, onSave } = useFeedListItem()
  if (!editable()) return null

  return (
    <Flex marginTop="auto" h={9}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Format />
        <AtMention />
        <Emoji />
      </Stack>
      <Flex ml="auto">
        <Button variant="outline" size="sm" onClick={onCancel}>
          Cancel
        </Button>
        <Button colorScheme="teal" ml={2} size="sm" w={28} onClick={onSave}>
          Save
        </Button>
      </Flex>
    </Flex>
  )
})
ToolBar.displayName = 'ToolBar'
