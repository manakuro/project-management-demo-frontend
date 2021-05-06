import React, { memo } from 'react'
import { Flex } from 'src/components/atoms'
import { Divider } from 'src/components/organisms/Navigation/Divider'
import { Workspace } from './Workspace'
import { Teammates } from './Teammates'
import { ProjectList } from './ProjectList'
import { useNavigation } from 'src/components/organisms/Navigation'

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
