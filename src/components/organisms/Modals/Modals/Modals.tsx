import React from 'react'
import {
  InviteModal,
  VideoPlayer,
  Help,
  ShareWorkspaceModal,
  TasksListDetail,
  EditorLinkModal,
  EditorMentionMenu,
} from 'src/components/organisms'
import { CustomizeMenu } from 'src/components/organisms/Tasks'

export const Modals: React.VFC = () => {
  return (
    <>
      <InviteModal />
      <ShareWorkspaceModal />
      <Help />
      <CustomizeMenu />
      <TasksListDetail />
      <VideoPlayer />
      <EditorLinkModal />
      <EditorMentionMenu />
    </>
  )
}
