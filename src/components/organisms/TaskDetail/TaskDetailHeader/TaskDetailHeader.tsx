import React, { memo, useMemo } from 'react'
import {
  Button,
  CheckIcon,
  Flex,
  Icon,
  IconButton,
  Stack,
  Skeleton,
} from 'src/components/atoms'
import { IconType } from 'src/shared/icons'
import { Attachment } from './Attachment'
import { Copy } from './Copy'
import { Like } from './Like'
import { MoreAction } from './MoreAction'
import { SubTasks } from './Subtasks'

type Props = {
  onClose: () => void
  loading?: boolean
  mode: Mode
}

const closeIcons = {
  modal: 'x',
  drawer: 'arrowToRight',
} as const
type Mode = keyof typeof closeIcons

export const TaskDetailHeader: React.FC<Props> = memo<Props>((props) => {
  const closeIcon = useMemo<IconType>(
    () => closeIcons[props.mode],
    [props.mode],
  )

  if (props.loading)
    return (
      <Flex px={6} h="57px" alignItems="center" flex={1}>
        <Skeleton h="28px" w="117px" />
        <Skeleton h="28px" w="212px" ml="auto" />
      </Flex>
    )

  return (
    <Flex px={6} h="57px" alignItems="center" flex={1}>
      <Flex flex={1}>
        <Button
          leftIcon={<CheckIcon isDone mt="0.75px" />}
          colorScheme="teal"
          variant="outline"
          size="xs"
        >
          Mark complete
        </Button>
      </Flex>
      <Flex>
        <Stack spacing={1} direction="row">
          <Like />
          <Attachment />
          <SubTasks />
          <Copy />
          <MoreAction />
          <IconButton
            aria-label="Close button"
            icon={<Icon icon={closeIcon} color="text.muted" />}
            variant="ghost"
            onClick={props.onClose}
            size="sm"
          />
        </Stack>
      </Flex>
    </Flex>
  )
})
TaskDetailHeader.displayName = 'TaskDetailHeader'
