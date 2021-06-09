import React, { memo } from 'react'
import { Divider, Stack } from 'src/components/atoms'
import {
  Bold,
  BulletList,
  DecreaseListIndent,
  IncreaseListIndent,
  Italic,
  Link,
  OrderedList,
  Strikethrough,
  Underline,
  Emoji,
  AtMention,
} from 'src/components/organisms/Editor/ToolBar'
import { useDescription } from './Provider'

type Props = {}

export const ToolBar: React.FC<Props> = memo<Props>(() => {
  const { focused } = useDescription()

  return (
    <Stack
      flex={1}
      direction="row"
      spacing={1}
      minH={8}
      alignItems="center"
      // TODO: Find a workaround to make tool bar sticky at bottom
      // position="sticky"
      // bottom={0}
      bg="white"
    >
      {focused && (
        <>
          <Bold />
          <Italic />
          <Underline />
          <Strikethrough />
          <BulletList />
          <OrderedList />
          <IncreaseListIndent />
          <DecreaseListIndent />
          <Link />
          <Divider orientation="vertical" borderColor="gray.400" h={5} />
          <AtMention />
          <Emoji />
        </>
      )}
    </Stack>
  )
})
ToolBar.displayName = 'ToolBar'
