import React, { memo } from 'react'
import { Spinner } from 'src/components/atoms'
import { ProjectTeammateMenuListItem } from './ProjectTeammateMenuListItem'

type Props = {}

export const ProjectTeammateMenuLoading: React.VFC<Props> = memo<Props>(() => {
  return (
    <ProjectTeammateMenuListItem
      index={-1}
      alignItems="center"
      justifyContent="center"
    >
      <Spinner size="sm" color="gray.400" emptyColor="gray.200" />
    </ProjectTeammateMenuListItem>
  )
})
ProjectTeammateMenuLoading.displayName = 'ProjectTeammateMenuLoading'
