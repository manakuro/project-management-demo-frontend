import React, { memo } from 'react'
import { FlexProps, Flex } from 'src/components/atoms'
import { useProjectDueDate } from '../hooks'

type Props = {
  dateString: string
} & FlexProps

export const ProjectDueInfo: React.FC<Props> = memo<Props>((props) => {
  const { dateString } = props
  const { isProjectDueDate } = useProjectDueDate({ dateString })

  if (isProjectDueDate)
    return (
      <Flex fontSize="xs" fontWeight="medium" color="orange.400">
        Project Due
      </Flex>
    )

  return null
})
ProjectDueInfo.displayName = 'ProjectDueInfo'
