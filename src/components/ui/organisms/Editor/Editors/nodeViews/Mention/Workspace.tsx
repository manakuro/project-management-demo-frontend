import React, { memo } from 'react'
import {
  PopoverEditorLink,
  PopoverEditorLinkTrigger,
  PopoverEditorLinkContent,
  PopoverEditorLinkText,
} from 'src/components/features/organisms/Popovers'
import { Icon } from 'src/components/ui/atoms'
import { useWorkspace } from 'src/store/entities/workspace'

export const Workspace: React.FC = memo(() => {
  const { workspace } = useWorkspace()

  return (
    <PopoverEditorLink>
      <PopoverEditorLinkTrigger>
        {workspace.name + ' '}
      </PopoverEditorLinkTrigger>
      <PopoverEditorLinkContent>
        <Icon icon="group" color="text.muted" />
        <PopoverEditorLinkText>{workspace.name}</PopoverEditorLinkText>
      </PopoverEditorLinkContent>
    </PopoverEditorLink>
  )
})
Workspace.displayName = 'Workspace'
