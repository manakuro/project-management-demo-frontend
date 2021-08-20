import React, { memo } from 'react'
import {
  EditorMentionMenu,
  EditorEmojiMenu,
} from 'src/components/organisms/Menus'
import {
  InviteModal,
  ShareWorkspaceModal,
  FileViewerModal,
  EditorLinkModal,
  DeleteTaskSectionModal,
  DuplicateTaskModal,
} from 'src/components/organisms/Modals'
import { Help } from 'src/components/organisms/Navigation'
import { VideoPlayer } from 'src/components/organisms/VideoPlayer'

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
