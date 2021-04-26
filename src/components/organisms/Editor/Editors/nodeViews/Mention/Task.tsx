import { CheckIcon, Flex, Link as AtomsLink } from 'src/components/atoms'
import React from 'react'
import { useReactNodeView } from 'src/components/organisms/Editor/Editors/ReactNodeView'
import {
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from 'src/components/organisms'
import { MentionAttrs } from 'src/shared/prosemirror/schema'
import { MentionText } from './MentionText'
import { useTask } from 'src/store/tasks'

export const Task: React.FC = () => {
  const context = useReactNodeView()
  const attrs = context.node?.attrs as MentionAttrs
  const { task } = useTask(attrs.mentionId)

  return (
    <Popover trigger="hover" isLazy placement="bottom-start" openDelay={500}>
      <PopoverTrigger>
        <AtomsLink>
          <MentionText>{task.name}</MentionText>
        </AtomsLink>
      </PopoverTrigger>
      <PopoverContent contentEditable={false}>
        <PopoverBody boxShadow="md" borderRadius="md">
          <Flex fontSize="sm" alignItems="center" userSelect="none">
            <CheckIcon isDone={task.isDone} size="sm" />
            <MentionText ml={3} flex={1}>
              {task.name}
            </MentionText>
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
