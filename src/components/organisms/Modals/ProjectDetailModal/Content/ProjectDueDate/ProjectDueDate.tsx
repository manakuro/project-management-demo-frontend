import React, { memo, useCallback, useMemo, useState } from 'react'
import {
  Button,
  ButtonProps,
  Box,
  Icon,
  Flex,
  DueDate as AtomsDueDate,
} from 'src/components/atoms'
import { useHover } from 'src/hooks/useHover'
import { ChakraProps } from 'src/shared/chakra'
import { useProject } from 'src/store/entities/projects'
import { DeleteButton } from './DeleteButton'
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

export const ProjectDueDate: React.FC<Props> = memo<Props>((props) => {
  const { projectId } = props
  const { project } = useProject(projectId)
  const { ref, isHovering } = useHover()
  const [focused, setFocused] = useState(false)
  const hasDueDate = useMemo(() => !!project.dueDate, [project.dueDate])
  const colorStyle = useMemo<ChakraProps>(
    () => (hasDueDate ? { color: 'text.base' } : { color: 'text.muted' }),
    [hasDueDate],
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
      <Flex>
        <Icon icon="calendarAlt" {...colorStyle} />
      </Flex>
      {focused ? (
        <Input projectId={projectId} onClose={handleClickInputOutside} />
      ) : (
        <>
          <AtomsDueDate
            ml={2}
            fontSize="sm"
            dueDate={project.dueDate}
            fallback="No due date"
            {...colorStyle}
          />
          {hasDueDate && (
            <DeleteButton isHovering={isHovering} projectId={project.id} />
          )}
        </>
      )}
    </Button>
  )
})
ProjectDueDate.displayName = 'ProjectOwner'
