import { memo } from 'react'
import { Flex } from 'src/components/ui/atoms'
import { useProjectsProjectId } from 'src/store/app/projects/project'
import { Description } from './Description'
import { DescriptionTitle } from './DescriptionTitle'

export const DescriptionSection = memo(function DescriptionSection() {
  const { projectId } = useProjectsProjectId()

  return (
    <Flex flexDirection="column">
      <DescriptionTitle projectId={projectId} />
      <Description projectId={projectId} />
    </Flex>
  )
})
