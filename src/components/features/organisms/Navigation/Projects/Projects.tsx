import React, { memo } from 'react'
import { useNavigation } from 'src/components/features/organisms/Navigation'
import { Divider } from 'src/components/features/organisms/Navigation/Divider'
import { Flex } from 'src/components/ui/atoms'
import { ProjectList } from './ProjectList'
import { Teammates } from './Teammates'
import { Workspace } from './Workspace'

type Props = {}

export const Projects: React.FC<Props> = memo<Props>(() => {
  const { isExpanded } = useNavigation()

  return (
    <>
      <Divider />
      <Flex flexDirection="column" flex={1}>
        <Workspace />
        {isExpanded && <Teammates />}
        <ProjectList />
      </Flex>
    </>
  )
})
Projects.displayName = 'Projects'
