import React from 'react'
import { InviteModal } from 'src/components/organisms'
import { Help } from 'src/components/organisms/Navigation/Help/Help'

export const Modals: React.VFC = () => {
  return (
    <>
      <InviteModal />
      <Help />
    </>
  )
}
