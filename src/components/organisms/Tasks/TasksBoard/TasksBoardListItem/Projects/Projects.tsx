import React, { memo } from 'react'
import { FlexProps, Stack } from 'src/components/atoms'
import { ProjectChip } from './ProjectChip'

type Props = FlexProps & {
  projectIds: string[]
}

export const Projects: React.FC<Props> = memo<Props>((props) => {
  const { projectIds } = props

  if (!projectIds.length) return null

  return (
    <Stack direction="row" spacing={2} mb={4}>
      {projectIds.map((id) => (
        <ProjectChip projectId={id} key={id} />
      ))}
    </Stack>
  )
})
Projects.displayName = 'Projects'
