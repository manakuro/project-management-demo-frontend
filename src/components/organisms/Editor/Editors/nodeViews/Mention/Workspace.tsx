import { Icon } from 'src/components/atoms'
import React, { memo } from 'react'
import {
  PopoverEditorLink,
  PopoverEditorLinkTrigger,
  PopoverEditorLinkContent,
  PopoverEditorLinkText,
} from 'src/components/organisms'
import { useWorkspace } from 'src/store/workspace'

export const Workspace: React.FC = memo(() => {
  const { workspace } = useWorkspace()

  return (
    <PopoverEditorLink>
      <PopoverEditorLinkTrigger>{workspace.name}</PopoverEditorLinkTrigger>
      <PopoverEditorLinkContent>
        <Icon icon="group" color="text.muted" />
        <PopoverEditorLinkText>{workspace.name}</PopoverEditorLinkText>
      </PopoverEditorLinkContent>
    </PopoverEditorLink>
  )
})