import { memo } from 'react'
import { Divider, Stack } from 'src/components/ui/atoms'
import {
  AtMention,
  Bold,
  BulletList,
  DecreaseListIndent,
  Emoji,
  IncreaseListIndent,
  Italic,
  Link,
  OrderedList,
  Strikethrough,
  Underline,
} from 'src/components/ui/organisms/Editor/ToolBar'
import { useDescriptionContext } from './Provider'

export const ToolBar = memo(function ToolBar() {
  const { focused } = useDescriptionContext()

  return (
    <Stack
      flex={1}
      direction="row"
      spacing={0}
      minH={8}
      maxH={8}
      alignItems="center"
      // TODO: Find a workaround to make tool bar sticky at bottom
      // position="sticky"
      // bottom={0}
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
