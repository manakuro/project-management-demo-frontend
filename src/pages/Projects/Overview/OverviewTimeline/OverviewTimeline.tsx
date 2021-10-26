import React, { memo } from 'react'
import { useProjectsProjectId } from 'src/store/app/projects/project'
import { DueDate } from './DueDate'
import { JoinedTeammates } from './JoinedTeammates'

type Props = {}

export const OverviewTimeline: React.VFC<Props> = memo<Props>(() => {
  const { projectId } = useProjectsProjectId()

  return (
    <>
      <DueDate projectId={projectId} />
      <JoinedTeammates projectId={projectId} />
    </>
  )
})
OverviewTimeline.displayName = 'OverviewTimeline'
