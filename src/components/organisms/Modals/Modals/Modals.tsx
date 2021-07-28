import React from 'react'
import {
  InviteModal,
  VideoPlayer,
  Help,
  ShareWorkspaceModal,
  TasksListDetail,
  EditorLinkModal,
  EditorMentionMenu,
  EditorEmojiMenu,
  FileViewerModal,
  DeleteTaskSectionModal,
} from 'src/components/organisms'

export const Modals: React.VFC = () => {
  return (
    <>
      <InviteModal />
      <ShareWorkspaceModal />
      <Help />
      <TasksListDetail />
      <VideoPlayer />
      <EditorLinkModal />
      <EditorMentionMenu />
      <EditorEmojiMenu />
      <FileViewerModal />
      <DeleteTaskSectionModal />
    </>
  )
}
