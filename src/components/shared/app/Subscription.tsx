import React, { memo } from 'react'
import { useFavoriteProjectIdsUpdatedSubscription } from 'src/store/entities/favoriteProjectIds'
import { useMe } from 'src/store/entities/me'
import { useProjectUpdatedSubscription } from 'src/store/entities/project'
import {
  useProjectTaskCreatedSubscription,
  useProjectTaskUpdatedSubscription,
  useProjectTaskCreatedByTaskIdSubscription,
  useProjectTaskDeletedSubscription,
} from 'src/store/entities/projectTask'
import {
  useProjectTaskSectionCreatedSubscription,
  useProjectTaskSectionDeletedAndDeleteTasksSubscription,
  useProjectTaskSectionDeletedAndKeepTasksSubscription,
  useProjectTaskSectionDeletedSubscription,
  useProjectTaskSectionUndeletedAndDeleteTasksSubscription,
  useProjectTaskSectionUndeletedAndKeepTasksSubscription,
  useProjectTaskSectionUpdatedSubscription,
} from 'src/store/entities/projectTaskSection'
import {
  useTaskDeletedSubscription,
  useTaskUndeletedSubscription,
  useTaskUpdatedSubscription,
  useTaskAssignedSubscription,
  useTaskUnassignedSubscription,
} from 'src/store/entities/task'
import {
  useTaskCollaboratorCreatedSubscription,
  useTaskCollaboratorDeletedSubscription,
} from 'src/store/entities/taskCollaborator'
import {
  useTaskFeedCreatedSubscription,
  useTaskFeedDeletedSubscription,
  useTaskFeedUpdatedSubscription,
} from 'src/store/entities/taskFeed'
import {
  useTaskFeedLikeCreatedSubscription,
  useTaskFeedLikeDeletedSubscription,
} from 'src/store/entities/taskFeedLike'
import {
  useTaskLikeCreatedSubscription,
  useTaskLikeDeletedSubscription,
} from 'src/store/entities/taskLike'
import {
  useTaskTagCreatedSubscription,
  useTaskTagDeletedSubscription,
} from 'src/store/entities/taskTag'
import {
  useTeammateTaskCreatedSubscription,
  useTeammateTaskUpdatedSubscription,
} from 'src/store/entities/teammateTask'
import {
  useTeammateTaskSectionCreatedSubscription,
  useTeammateTaskSectionDeletedAndDeleteTasksSubscription,
  useTeammateTaskSectionDeletedAndKeepTasksSubscription,
  useTeammateTaskSectionDeletedSubscription,
  useTeammateTaskSectionUndeletedAndDeleteTasksSubscription,
  useTeammateTaskSectionUndeletedAndKeepTasksSubscription,
  useTeammateTaskSectionUpdatedSubscription,
} from 'src/store/entities/teammatesTaskSection'
import {
  useWorkspace,
  useWorkspaceUpdatedSubscription,
} from 'src/store/entities/workspace'

export const Subscription: React.FCWithChildren = memo((props) => {
  const { workspace } = useWorkspace()
  const { me } = useMe()

  useFavoriteProjectIdsUpdatedSubscription({
    teammateId: me.id,
    workspaceId: workspace.id,
  })
  useWorkspaceUpdatedSubscription({
    workspaceId: workspace.id,
  })

  useProjectTaskCreatedSubscription({
    workspaceId: workspace.id,
  })
  useProjectTaskUpdatedSubscription({
    workspaceId: workspace.id,
  })
  useProjectTaskCreatedByTaskIdSubscription({
    workspaceId: workspace.id,
  })
  useProjectTaskDeletedSubscription({
    workspaceId: workspace.id,
  })

  useProjectTaskSectionCreatedSubscription({
    workspaceId: workspace.id,
  })
  useProjectTaskSectionUpdatedSubscription({
    workspaceId: workspace.id,
  })
  useProjectTaskSectionDeletedSubscription({
    workspaceId: workspace.id,
  })
  useProjectTaskSectionDeletedAndKeepTasksSubscription({
    workspaceId: workspace.id,
  })
  useProjectTaskSectionDeletedAndDeleteTasksSubscription({
    workspaceId: workspace.id,
  })
  useProjectTaskSectionUndeletedAndKeepTasksSubscription({
    workspaceId: workspace.id,
  })
  useProjectTaskSectionUndeletedAndDeleteTasksSubscription({
    workspaceId: workspace.id,
  })

  useProjectUpdatedSubscription({
    workspaceId: workspace.id,
  })

  useTaskDeletedSubscription({
    workspaceId: workspace.id,
  })
  useTaskUndeletedSubscription({
    workspaceId: workspace.id,
  })
  useTaskAssignedSubscription({
    workspaceId: workspace.id,
  })
  useTaskUnassignedSubscription({
    workspaceId: workspace.id,
  })

  useTaskFeedUpdatedSubscription({
    workspaceId: workspace.id,
  })

  useTaskFeedCreatedSubscription({
    workspaceId: workspace.id,
  })

  useTaskFeedDeletedSubscription({
    workspaceId: workspace.id,
  })

  useTaskFeedLikeCreatedSubscription({
    workspaceId: workspace.id,
  })
  useTaskFeedLikeDeletedSubscription({
    workspaceId: workspace.id,
  })

  useTaskLikeCreatedSubscription({
    workspaceId: workspace.id,
  })
  useTaskLikeDeletedSubscription({
    workspaceId: workspace.id,
  })

  useTeammateTaskSectionUpdatedSubscription({
    teammateId: me.id,
    workspaceId: workspace.id,
  })
  useTeammateTaskSectionCreatedSubscription({
    teammateId: me.id,
    workspaceId: workspace.id,
  })
  useTeammateTaskSectionDeletedSubscription({
    teammateId: me.id,
    workspaceId: workspace.id,
  })
  useTeammateTaskSectionDeletedAndKeepTasksSubscription({
    teammateId: me.id,
    workspaceId: workspace.id,
  })
  useTeammateTaskSectionDeletedAndDeleteTasksSubscription({
    teammateId: me.id,
    workspaceId: workspace.id,
  })
  useTeammateTaskSectionUndeletedAndKeepTasksSubscription({
    teammateId: me.id,
    workspaceId: workspace.id,
  })
  useTeammateTaskSectionUndeletedAndDeleteTasksSubscription({
    teammateId: me.id,
    workspaceId: workspace.id,
  })

  useTeammateTaskCreatedSubscription({
    teammateId: me.id,
    workspaceId: workspace.id,
  })
  useTeammateTaskUpdatedSubscription({
    teammateId: me.id,
    workspaceId: workspace.id,
  })

  useTaskUpdatedSubscription({
    workspaceId: workspace.id,
  })

  useTaskTagCreatedSubscription({
    workspaceId: workspace.id,
  })
  useTaskTagDeletedSubscription({
    workspaceId: workspace.id,
  })

  useTaskCollaboratorCreatedSubscription({
    workspaceId: workspace.id,
  })
  useTaskCollaboratorDeletedSubscription({
    workspaceId: workspace.id,
  })

  return props.children as React.ReactElement
})
Subscription.displayName = 'Subscription'
