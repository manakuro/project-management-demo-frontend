import type React from 'react'
import { memo, useCallback } from 'react'
import { useProjectDetailModal } from 'src/components/features/organisms/Modals'
import { Icon, IconButton, type IconButtonProps } from 'src/components/ui/atoms'

type Props = {
  projectId: string
} & Omit<IconButtonProps, 'aria-label'>

export const ProjectDetailIconButton: React.FC<Props> = memo<Props>((props) => {
  const { projectId, ...rest } = props
  const { onOpen, setProjectId } = useProjectDetailModal()

  const handleClick = useCallback(() => {
    setProjectId(projectId)
    onOpen()
  }, [onOpen, projectId, setProjectId])

  return (
    <IconButton
      aria-label="Project detail"
      icon={<Icon icon="infoCircle" color="text.muted" size="xs" />}
      variant="ghost"
      {...rest}
      h={6}
      w={6}
      onClick={handleClick}
    />
  )
})

ProjectDetailIconButton.displayName = 'ProjectDetailIconButton'
