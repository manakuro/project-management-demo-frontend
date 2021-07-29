import React, { memo } from 'react'
import { Flex } from 'src/components/atoms'
import { useNavigation } from 'src/components/organisms/Navigation'
import { Divider } from 'src/components/organisms/Navigation/Divider'
import { ProjectList } from './ProjectList'
import { Teammates } from './Teammates'
import { Workspace } from './Workspace'

type Props = {}

export const Projects: React.VFC<Props> = memo<Props>(() => {
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
