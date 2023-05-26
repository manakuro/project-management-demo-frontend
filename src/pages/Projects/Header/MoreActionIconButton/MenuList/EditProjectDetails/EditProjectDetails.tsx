import React, { memo, useCallback } from 'react'
import { useProjectDetailModal } from 'src/components/features/organisms/Modals'
import { Icon } from 'src/components/ui/atoms'
import { MenuItem } from 'src/components/ui/organisms/Menu'

type Props = {
  onClose: () => void
  onMouseEnter: () => void
  projectId: string
}

export const EditProjectDetails: React.FC<Props> = memo<Props>((props) => {
  const { onMouseEnter, projectId, onClose } = props
  const { onOpen, setProjectId } = useProjectDetailModal()

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      e.preventDefault()
      onClose()

      setProjectId(projectId)
      onOpen()
    },
    [onClose, setProjectId, projectId, onOpen],
  )

  return (
    <MenuItem
      onMouseEnter={onMouseEnter}
      icon={<Icon icon="pencil" color="text.muted" />}
      onClick={handleClick}
    >
      Edit Project details
    </MenuItem>
  )
})
EditProjectDetails.displayName = 'EditProjectDetails'
