import React, { memo } from 'react'
import { NewBox } from 'src/components/molecules'
import { MenuButton } from 'src/components/organisms/Menu'
import { AttachmentMenu } from 'src/components/organisms/Menus'

type Props = {}

export const NewButton: React.FC<Props> = memo<Props>(() => {
  return (
    <AttachmentMenu
      label="Attach a file. This file will not be persisted in database."
      tooltip={{ size: 'md', textAlign: 'left' }}
    >
      <MenuButton cursor="pointer">
        <NewBox size="lg" />
      </MenuButton>
    </AttachmentMenu>
  )
})
NewButton.displayName = 'NewButton'
