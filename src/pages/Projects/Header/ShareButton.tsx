import React, { memo, useCallback } from 'react'
import { Tooltip } from 'src/components/molecules'
import { useTooltip } from 'src/components/molecules/Tooltip/useTooltip'
import { useShareProjectModal } from 'src/components/organisms/Modals/ShareProjectModal'
import { Button, Flex, FlexProps, Icon } from 'src/components/ui/atoms'
import { useProjectsProjectId } from 'src/store/app/projects/project'
import { useWorkspace } from 'src/store/entities/workspace'

type Props = FlexProps

export const ShareButton: React.FC<Props> = memo<Props>((props) => {
  const { projectId } = useProjectsProjectId()
  const { onOpen, setProjectId, setShareTab } = useShareProjectModal()
  const { isOpen, ref } = useTooltip()
  const { workspace } = useWorkspace()

  const handleClick = useCallback(() => {
    setProjectId(projectId)
    setShareTab()
    onOpen()
  }, [onOpen, projectId, setProjectId, setShareTab])

  return (
    <Flex alignItems="center" {...props}>
      <Tooltip
        isOpen={isOpen}
        hasArrow
        label={`Members of this ${workspace.name} team can find this project`}
        aria-label="A share button description"
        size="md"
      >
        <Button
          ref={ref}
          leftIcon={<Icon icon="lockAlt" mt="-1px" size="xs" />}
          variant="outline"
          size="xs"
          onClick={handleClick}
        >
          Share
        </Button>
      </Tooltip>
    </Flex>
  )
})
ShareButton.displayName = 'ShareButton'
