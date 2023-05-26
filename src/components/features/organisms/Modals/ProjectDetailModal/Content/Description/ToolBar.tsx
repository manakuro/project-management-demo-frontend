import React, { memo } from 'react'
import { Divider, Stack } from 'src/components/ui/atoms'
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
} from 'src/components/ui/organisms/Editor/ToolBar'
import { useDescriptionContext } from './Provider'

type Props = {}

export const ToolBar: React.FC<Props> = memo<Props>(() => {
  const { focused } = useDescriptionContext()

  return (
    <Stack
      flex={1}
      direction="row"
      spacing={0}
      minH={8}
      alignItems="center"
      bg="white"
      flexWrap="wrap"
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
