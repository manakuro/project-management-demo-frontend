import React, { memo } from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { useTasksContext } from 'src/components/organisms/Tasks'
import { ProjectDueInfo } from './ProjectDueInfo'

type Props = {
  dateString: string
} & FlexProps

export const Info: React.FC<Props> = memo<Props>((props) => {
  const { dateString } = props
  const { isProjectsPage } = useTasksContext()

  if (isProjectsPage)
    return (
      <Flex ml="auto">
        <ProjectDueInfo dateString={dateString} />
      </Flex>
    )

  return null
})
Info.displayName = 'Info'
