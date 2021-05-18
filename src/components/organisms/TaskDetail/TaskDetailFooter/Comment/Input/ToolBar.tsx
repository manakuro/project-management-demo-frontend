import React, { memo } from 'react'
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
import { Divider, Stack } from 'src/components/atoms'
import { useInput } from './Provider'
import { transitions } from 'src/styles'

type Props = {}

export const ToolBar: React.FC<Props> = memo<Props>(() => {
  const { focused } = useInput()

  return (
    <Stack
      direction="row"
      spacing={1}
      h={focused ? 8 : 0}
      alignItems="center"
      transition={transitions.base('height')}
      marginTop="auto"
      overflow="hidden"
    >
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
    </Stack>
  )
})
ToolBar.displayName = 'ToolBar'
