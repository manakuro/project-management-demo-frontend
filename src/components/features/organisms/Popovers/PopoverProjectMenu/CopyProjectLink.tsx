import type React from 'react'
import { useCallback } from 'react'
import { useCopyProjectLink } from 'src/hooks/pages/projects'
import { MenuItem } from './MenuItem'

type Props = {
  projectId: string
  onClose: () => void
  onMouseEnter: () => void
}

export const CopyProjectLink: React.FC<Props> = (props) => {
  const { projectId, onClose, onMouseEnter } = props
  const { copyProjectLink } = useCopyProjectLink({ projectId })

  const handleClick = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      e.preventDefault()
      onClose()

      await copyProjectLink()
    },
    [copyProjectLink, onClose],
  )

  return (
    <MenuItem onMouseEnter={onMouseEnter} onClick={handleClick}>
      Copy Project Link
    </MenuItem>
  )
}
