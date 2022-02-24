import React, { memo } from 'react'
import { useFavoriteProjectIdsUpdatedSubscription } from 'src/store/entities/favoriteProjectIds'
import { useMe } from 'src/store/entities/me'
import { useProjectUpdatedSubscription } from 'src/store/entities/project'
import { useProjectTaskCreatedSubscription } from 'src/store/entities/projectTask'
import {
  useProjectTaskSectionCreatedSubscription,
  useProjectTaskSectionUpdatedSubscription,
} from 'src/store/entities/projectTaskSection'
import {
  useTaskDeletedSubscription,
  useTaskUndeletedSubscription,
  useTaskUpdatedSubscription,
} from 'src/store/entities/task'
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
import { useTeammateTaskCreatedSubscription } from 'src/store/entities/teammateTask'
import {
  useTeammateTaskSectionCreatedSubscription,
  useTeammateTaskSectionUpdatedSubscription,
} from 'src/store/entities/teammatesTaskSection'
import {
  useWorkspace,
  useWorkspaceUpdatedSubscription,
} from 'src/store/entities/workspace'

export const Subscription: React.FC = memo((props) => {
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

  useProjectTaskSectionCreatedSubscription({
    workspaceId: workspace.id,
  })

  useProjectTaskSectionUpdatedSubscription({
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
    workspaceId: workspace.id,
  })
  useTeammateTaskSectionCreatedSubscription({
    teammateId: me.id,
    workspaceId: workspace.id,
  })

  useTeammateTaskCreatedSubscription({
    teammateId: me.id,
    workspaceId: workspace.id,
  })

  useTaskUpdatedSubscription({
    workspaceId: workspace.id,
  })

  return props.children as React.ReactElement
})
Subscription.displayName = 'Subscription'
