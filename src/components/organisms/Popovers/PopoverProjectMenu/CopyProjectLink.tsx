import React, { useCallback } from 'react'
import { useToast } from 'src/hooks'
import { getProjectsURL } from 'src/router/projects'
import { MenuItem } from './MenuItem'

type Props = {
  projectId: string
  onClose: () => void
  onMouseEnter: () => void
}

export const CopyProjectLink: React.VFC<Props> = (props) => {
  const { projectId, onClose, onMouseEnter } = props
  const { toast } = useToast()

  const handleClick = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      e.preventDefault()
      onClose()

      await navigator.clipboard.writeText(getProjectsURL(projectId))
      toast({
        description: 'The project link was copied to your clipboard.',
      })
    },
    [onClose, projectId, toast],
  )

  return (
    <MenuItem onMouseEnter={onMouseEnter} onClick={handleClick}>
      Copy Project Link
    </MenuItem>
  )
}
