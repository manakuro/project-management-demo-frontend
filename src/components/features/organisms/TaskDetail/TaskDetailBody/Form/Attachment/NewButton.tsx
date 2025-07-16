import { memo } from 'react'
import { AttachmentMenu } from 'src/components/features/organisms/Menus'
import { NewBox } from 'src/components/ui/molecules'
import { MenuButton } from 'src/components/ui/organisms/Menu'

export const NewButton = memo(function NewButton() {
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
