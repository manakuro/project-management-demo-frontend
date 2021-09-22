import React, { memo } from 'react'
import { ColorBox, Flex, Icon, Text } from 'src/components/atoms'
import { MenuItem } from 'src/components/organisms/Menu'
import { PopoverSetColorAndIcon } from 'src/components/organisms/Popovers'
import { useProject } from 'src/store/entities/projects'

type Props = {
  onClose: () => void
  onMouseEnter: () => void
  isOpen: boolean
  projectId: string
}

export const SetColorAndIcon: React.FC<Props> = memo((props) => {
  const { onMouseEnter, isOpen, projectId } = props
  const { project } = useProject(projectId)

  return (
    <MenuItem
      icon={<ColorBox size="md" color={project.color.color} mt="-1px" />}
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
