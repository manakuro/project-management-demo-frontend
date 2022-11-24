import React, { useCallback } from 'react'
import { useShareProjectModal } from 'src/components/organisms/Modals'
import { MenuItem } from './MenuItem'

type Props = {
  projectId: string
  onClose: () => void
  onMouseEnter: () => void
}

export const Share: React.FC<Props> = (props) => {
  const { projectId, onClose, onMouseEnter } = props
  const { onOpen, setProjectId, setShareTab } = useShareProjectModal()

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      e.preventDefault()
      onClose()

      setProjectId(projectId)
      setShareTab()
      onOpen()
    },
    [onClose, setProjectId, projectId, setShareTab, onOpen],
  )

  return (
    <MenuItem onMouseEnter={onMouseEnter} onClick={handleClick}>
      Share
    </MenuItem>
  )
}
