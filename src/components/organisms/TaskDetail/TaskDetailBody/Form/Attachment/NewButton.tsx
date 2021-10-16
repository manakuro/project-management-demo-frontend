import React, { memo } from 'react'
import { NewBox } from 'src/components/molecules'
import { MenuButton } from 'src/components/organisms/Menu'
import { AttachmentMenu } from 'src/components/organisms/Menus'

type Props = {}

export const NewButton: React.VFC<Props> = memo<Props>(() => {
  return (
    <AttachmentMenu label="Attach a file" tooltip={{ size: 'sm' }}>
      <MenuButton cursor="pointer">
        <NewBox size="lg" />
      </MenuButton>
    </AttachmentMenu>
  )
})
NewButton.displayName = 'NewButton'
