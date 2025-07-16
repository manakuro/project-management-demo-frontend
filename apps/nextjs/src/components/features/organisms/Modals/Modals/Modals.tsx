import type React from 'react';
import { memo } from 'react';
import {
  EditorEmojiMenu,
  EditorMentionMenu,
} from 'src/components/features/organisms/Menus';
import {
  DuplicateTaskModal,
  EditorLinkModal,
  FileViewerModal,
  InviteModal,
  ProjectDetailModal,
  ShareProjectModal,
  ShareWorkspaceModal,
} from 'src/components/features/organisms/Modals';
import { Help } from 'src/components/features/organisms/Navigation';
import { VideoPlayer } from 'src/components/ui/organisms/VideoPlayer';

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
  );
});
Modals.displayName = 'Modals';
