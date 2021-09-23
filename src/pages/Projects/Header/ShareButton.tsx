import React, { memo, useCallback } from 'react'
import { Button, Flex, FlexProps, Icon } from 'src/components/atoms'
import { Tooltip } from 'src/components/molecules'
import { useTooltip } from 'src/components/molecules/Tooltip/useTooltip'
import { useShareWorkspaceModal } from 'src/components/organisms/Modals/ShareWorkspaceModal'
import { useWorkspace } from 'src/store/entities/workspace'

type Props = FlexProps

export const ShareButton: React.VFC<Props> = memo<Props>((props) => {
  const { setIsOpen } = useShareWorkspaceModal()
  const { isOpen, ref } = useTooltip()
  const { workspace } = useWorkspace()

  const handleShareWorkspace = useCallback(() => {
    setIsOpen(true)
  }, [setIsOpen])

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
          onClick={handleShareWorkspace}
        >
          Share
        </Button>
      </Tooltip>
    </Flex>
  )
})
