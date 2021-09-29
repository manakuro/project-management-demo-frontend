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
import { useOwnerTeammateIdsByProjectId } from 'src/store/entities/projectsTeammates'
import { useTeammate } from 'src/store/entities/teammates'
import { Input } from './Input'

type Props = {
  projectId: string
}

const focusedStyle: ButtonProps = {
  bg: 'transparent',
  border: '1px',
  borderColor: 'gray.200',
  _hover: {
    bg: 'transparent',
  },
}

export const ProjectOwner: React.FC<Props> = memo<Props>((props) => {
  const { projectId } = props
  const { clickableHoverLightStyle } = useClickableHoverStyle()
  const { ref, isHovering } = useHover()
  const [focused, setFocused] = useState(false)
  const { teammateId } = useOwnerTeammateIdsByProjectId(projectId)
  const { teammate } = useTeammate(teammateId)
  const hasOwner = useMemo(() => !!teammate.id, [teammate.id])
  const name = useMemo(
    () => (hasOwner ? teammate.name : 'No Owner'),
    [hasOwner, teammate.name],
  )
  const nameStyle = useMemo<TextProps>(
    () =>
      hasOwner
        ? {
            color: 'text.base',
          }
        : {
            color: 'text.muted',
          },
    [hasOwner],
  )

  const handleClick = useCallback(() => {
    setFocused(true)
  }, [])

  const handleClickInputOutside = useCallback(() => {
    setFocused(false)
  }, [])

  return (
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
          {hasOwner && (
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
  )
})
ProjectOwner.displayName = 'ProjectOwner'
