import React, { memo } from 'react'
import { DeleteTaskSectionModal } from 'src/components/organisms/Modals'

export const TasksModals: React.VFC = memo(() => {
  return (
    <>
      <DeleteTaskSectionModal />
    </>
  )
})
TasksModals.displayName = 'TasksModals'
