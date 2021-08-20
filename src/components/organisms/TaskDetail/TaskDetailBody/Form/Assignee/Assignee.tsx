import React, { memo, useCallback, useMemo, useState } from 'react'
import {
  Button,
  ButtonProps,
  Icon,
  Text,
  Box,
  TextProps,
} from 'src/components/atoms'
import { TeammateAvatar } from 'src/components/organisms/TeammateAvatar'
import { useClickableHoverStyle } from 'src/hooks'
import { useHover } from 'src/hooks/useHover'
import { useTask } from 'src/store/entities/tasks'
import { useTeammate } from 'src/store/entities/teammates'
import { Row, Label, Content } from '../Row'
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

export const Assignee: React.FC<Props> = memo((props) => {
  const { clickableHoverLightStyle } = useClickableHoverStyle()
  const { ref, isHovering } = useHover()
  const [focused, setFocused] = useState(false)
  const { task } = useTask(props.taskId)
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
            <Input onClickOutside={handleClickInputOutside} />
          ) : (
            <>
              <Text ml={2} fontSize="sm" {...nameStyle}>
                {name}
              </Text>
              {isAssigned && (
                <Icon
                  ml={2}
                  mt="1px"
                  icon="x"
                  color="text.muted"
                  size="sm"
                  visibility={isHovering ? 'visible' : 'hidden'}
                  {...clickableHoverLightStyle}
                  onClick={(e) => {
                    e.stopPropagation()
                    console.log('click!')
                  }}
                />
              )}
            </>
          )}
        </Button>
      </Content>
    </Row>
  )
})
Assignee.displayName = 'Assignee'
