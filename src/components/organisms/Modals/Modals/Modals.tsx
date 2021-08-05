import React, { memo } from 'react'
import {
  InviteModal,
  VideoPlayer,
  Help,
  ShareWorkspaceModal,
  EditorLinkModal,
  EditorMentionMenu,
  EditorEmojiMenu,
  FileViewerModal,
  DeleteTaskSectionModal,
  DuplicateTaskModal,
} from 'src/components/organisms'

export const Modals: React.VFC = memo(() => {
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
      <DeleteTaskSectionModal />
      <DuplicateTaskModal />
    </>
  )
})
Modals.displayName = 'Modals'
