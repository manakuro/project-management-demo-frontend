import React from 'react'
import {
  Button,
  CheckIcon,
  Flex,
  Icon,
  IconButton,
  Stack,
} from 'src/components/atoms'
import { Like } from './Like'
import { Attachment } from './Attachment'
import { SubTasks } from './Subtasks'
import { Copy } from './Copy'
import { MoreAction } from './MoreAction'

type Props = {
  onClose: () => void
}

export const TaskDetailHeader: React.FC<Props> = (props) => {
  return (
    <Flex px={6} h="57px" alignItems="center">
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
            icon={<Icon icon="arrowToRight" color="text.muted" />}
            variant="ghost"
            onClick={props.onClose}
            size="sm"
          />
        </Stack>
      </Flex>
    </Flex>
  )
}
