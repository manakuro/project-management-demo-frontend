import React, { memo, useCallback } from 'react'
import { Flex, FlexProps, Icon, Link } from 'src/components/atoms'
import { useProject } from 'src/store/entities/project'
import { transitions } from 'src/styles'

type Props = FlexProps & {
  projectId: string
}

export const Project: React.FC<Props> = memo<Props>((props) => {
  const { projectId } = props
  const { project } = useProject(projectId)

  const handleClick = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
  }, [])

  return (
    <Flex flex={1} mt={1}>
      <Flex alignItems="center">
        <Icon icon="outlineProject" color="text.muted" />
        <Link
          mt="2px"
          fontSize="md"
          fontWeight="medium"
          ml={2}
          transition={transitions.base()}
          hover
          onClick={handleClick}
        >
          {project.name}
        </Link>
      </Flex>
    </Flex>
  )
})

Project.displayName = 'Project'
