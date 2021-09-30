import React, { memo, useCallback, useMemo, useState } from 'react'
import { Button, ButtonProps, Text, Box, TextProps } from 'src/components/atoms'
import { TeammateAvatar } from 'src/components/organisms/TeammateAvatar'
import { useHover } from 'src/hooks/useHover'
import { useTask } from 'src/store/entities/tasks'
import { useTeammate } from 'src/store/entities/teammates'
import { Row, Label, Content } from '../Row'
import { DeleteButton } from './DeleteButton'
import { Input } from './Input'

type Props = {
  taskId: string
}

const focusedStyle: ButtonProps = {
  bg: 'transparent',
  border: '1px',
  borderColor: 'gray.200',
  _hover: {
    bg: 'transparent',
  },
}

export const Assignee: React.FC<Props> = memo<Props>((props) => {
  const { taskId } = props
  const { ref, isHovering } = useHover()
  const [focused, setFocused] = useState(false)
  const { task } = useTask(taskId)
  const { teammate } = useTeammate(task.assigneeId)
  const isAssigned = useMemo(() => !!teammate.id, [teammate.id])
  const name = useMemo(
    () => (isAssigned ? teammate.name : 'No assignee'),
    [isAssigned, teammate.name],
  )
  const nameStyle = useMemo<TextProps>(
    () =>
      isAssigned
        ? {
            color: 'text.base',
          }
        : {
            color: 'text.muted',
          },
    [isAssigned],
  )

  const handleClick = useCallback(() => {
    setFocused(true)
  }, [])

  const handleClickInputOutside = useCallback(() => {
    setFocused(false)
  }, [])

  return (
    <Row>
      <Label>Assignee</Label>
      <Content>
        <Button
          as={Box}
          variant="ghost"
          size="sm"
          ref={ref}
          border="1px"
          borderColor="transparent"
          onClick={handleClick}
          cursor="pointer"
          {...(focused ? focusedStyle : {})}
        >
          <TeammateAvatar teammateId={teammate.id} size="xs" />
          {focused ? (
            <Input taskId={taskId} onClose={handleClickInputOutside} />
          ) : (
            <>
              <Text ml={2} fontSize="sm" {...nameStyle}>
                {name}
              </Text>
              {isAssigned && (
                <DeleteButton isHovering={isHovering} taskId={taskId} />
              )}
            </>
          )}
        </Button>
      </Content>
    </Row>
  )
})
Assignee.displayName = 'Assignee'
