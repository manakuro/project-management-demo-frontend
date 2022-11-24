import React, { memo } from 'react'
import { Flex } from 'src/components/atoms'
import { ProjectList } from './ProjectList'

type Props = {}

export const Projects: React.FC<Props> = memo<Props>(() => {
  return (
    <Flex flexDirection="column" flex={1}>
      <ProjectList />
    </Flex>
  )
})
Projects.displayName = 'Projects'
