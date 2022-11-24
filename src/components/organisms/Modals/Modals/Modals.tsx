import React, { memo } from 'react'
import {
  EditorMentionMenu,
  EditorEmojiMenu,
} from 'src/components/organisms/Menus'
import {
  InviteModal,
  ShareWorkspaceModal,
  ShareProjectModal,
  FileViewerModal,
  EditorLinkModal,
  DuplicateTaskModal,
  ProjectDetailModal,
} from 'src/components/organisms/Modals'
import { Help } from 'src/components/organisms/Navigation'
import { VideoPlayer } from 'src/components/organisms/VideoPlayer'

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
