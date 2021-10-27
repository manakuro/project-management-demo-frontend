import React, { memo } from 'react'
import { Flex } from 'src/components/atoms'
import { useProjectsProjectId } from 'src/store/app/projects/project'
import { Description } from './Description'
import { DescriptionTitle } from './DescriptionTitle'

type Props = {}

export const DescriptionSection: React.VFC<Props> = memo<Props>(() => {
  const { projectId } = useProjectsProjectId()

  return (
    <Flex flexDirection="column">
      <DescriptionTitle projectId={projectId} />
      <Description projectId={projectId} />
    </Flex>
  )
})
DescriptionSection.displayName = 'DescriptionSection'
