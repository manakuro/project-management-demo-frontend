import React, { memo, useMemo } from 'react'
import {
  Flex,
  Icon,
  IconButton,
  Stack,
  Skeleton,
  FlexProps,
} from 'src/components/atoms'
import { useTaskDetail } from 'src/components/organisms/TaskDetail'
import { IconType } from 'src/shared/icons'
import { Attachment } from './Attachment'
import { Complete } from './Complete'
import { Copy } from './Copy'
import { Like } from './Like'
import { MoreAction } from './MoreAction'
import { SubTasks } from './Subtasks'

type Props = {
  mode?: Mode
  onClose?: () => void
  loading?: boolean
} & FlexProps

const closeIcons = {
  modal: 'x',
  drawer: 'arrowToRight',
} as const
type Mode = keyof typeof closeIcons

export const TaskDetailHeader: React.FC<Props> = memo<Props>((props) => {
  const { mode, onClose, loading, ...rest } = props
  const { taskId } = useTaskDetail()

  const closeIcon = useMemo<IconType>(() => closeIcons[mode ?? 'modal'], [mode])

  if (loading)
    return (
      <Flex px={6} h="57px" alignItems="center" flex={1}>
        <Skeleton h="28px" w="117px" />
        <Skeleton h="28px" w="212px" ml="auto" />
      </Flex>
    )

  return (
    <Flex px={6} h="57px" alignItems="center" flex={1} {...rest}>
      <Flex flex={1}>
        <Complete taskId={taskId} />
      </Flex>
      <Flex>
        <Stack spacing={1} direction="row">
          <Like />
          <Attachment />
          <SubTasks taskId={taskId} />
          <Copy taskId={taskId} />
          <MoreAction taskId={taskId} />
          {onClose && (
            <IconButton
              aria-label="Close button"
              icon={<Icon icon={closeIcon} color="text.muted" />}
              variant="ghost"
              onClick={onClose}
              size="sm"
            />
          )}
        </Stack>
      </Flex>
    </Flex>
  )
})
TaskDetailHeader.displayName = 'TaskDetailHeader'
