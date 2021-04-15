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
} from 'src/components/organisms'
import { Divider, Stack } from 'src/components/atoms'

type Props = {
  show: boolean
}

export const ToolBar: React.FC<Props> = memo<Props>((props) => {
  return (
    <Stack flex={1} direction="row" spacing={1} minH={8} alignItems="center">
      {props.show && (
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
        </>
      )}
    </Stack>
  )
})
