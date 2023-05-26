import React, { memo } from 'react'
import {
  EditorMentionMenu,
  EditorEmojiMenu,
} from 'src/components/features/organisms/Menus'
import {
  InviteModal,
  ShareWorkspaceModal,
  ShareProjectModal,
  FileViewerModal,
  EditorLinkModal,
  DuplicateTaskModal,
  ProjectDetailModal,
} from 'src/components/features/organisms/Modals'
import { Help } from 'src/components/features/organisms/Navigation'
import { VideoPlayer } from 'src/components/ui/organisms/VideoPlayer'

export const Modals: React.FC = memo(() => {
  return (
    <>
      <InviteModal />
      <ShareWorkspaceModal />
      <Help />
      <VideoPlayer />
      <EditorLinkModal />
      <EditorMentionMenu />
      <EditorEmojiMenu />
      <FileViewerModal />
      <DuplicateTaskModal />
      <ShareProjectModal />
      <ProjectDetailModal />
    </>
  )
})
Modals.displayName = 'Modals'
