import React, { memo } from 'react'
import { AttachmentMenu, MenuButton } from 'src/components/organisms'
import { NewBox } from 'src/components/molecules'

type Props = {}

export const NewButton: React.VFC<Props> = memo<Props>(() => {
  return (
    <AttachmentMenu label="Attach a file" tooltipSize="sm">
      <MenuButton cursor="pointer">
        <NewBox size="lg" />
      </MenuButton>
    </AttachmentMenu>
  )
})
