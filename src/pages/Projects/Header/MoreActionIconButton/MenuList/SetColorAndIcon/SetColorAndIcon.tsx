import type React from 'react'
import { memo } from 'react'
import { PopoverSetColorAndIcon } from 'src/components/features/organisms/Popovers'
import { ColorBox, Flex, Icon, Text } from 'src/components/ui/atoms'
import { MenuItem } from 'src/components/ui/organisms/Menu'
import { useProject } from 'src/store/entities/project'
import { useProjectBaseColor } from 'src/store/entities/projectBaseColor'

type Props = {
  onClose: () => void
  onMouseEnter: () => void
  isOpen: boolean
  projectId: string
}

export const SetColorAndIcon: React.FC<Props> = memo((props) => {
  const { onMouseEnter, isOpen, projectId } = props
  const { project } = useProject(projectId)
  const { projectBaseColor } = useProjectBaseColor(project.projectBaseColorId)

  return (
    <MenuItem
      icon={
        <ColorBox size="md" color={projectBaseColor.color.color} mt="-1px" />
      }
      onMouseEnter={onMouseEnter}
    >
      <PopoverSetColorAndIcon
        project={project}
        isOpen={isOpen}
        placement="right-end"
      >
        <Flex>
          <Text fontSize="sm" flex={1}>
            Set Color & icon
          </Text>
          <Icon icon="chevronRight" />
        </Flex>
      </PopoverSetColorAndIcon>
    </MenuItem>
  )
})
SetColorAndIcon.displayName = 'SetColorAndIcon'
