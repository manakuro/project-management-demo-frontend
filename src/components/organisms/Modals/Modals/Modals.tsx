import React from 'react'
import { InviteModal, VideoPlayer, Help } from 'src/components/organisms'

export const Modals: React.VFC = () => {
  return (
    <>
      <InviteModal />
      <Help />
      <VideoPlayer />
    </>
  )
}
