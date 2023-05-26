import React, { memo } from 'react'
import { useTasksContext } from 'src/components/features/organisms/Tasks'
import { Flex, FlexProps } from 'src/components/ui/atoms'
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
