import React, { memo, useCallback } from 'react'
import {
  Icon as AtomsIcon,
  BoxProps,
  WrapItem,
  Center,
} from 'src/components/atoms'
import { useLinkHoverStyle } from 'src/hooks'
import { IconType } from 'src/shared/icons'
import { useProjectBaseColor } from 'src/store/entities/projectBaseColor'
import { useProjectIcon } from 'src/store/entities/projectIcon'
import { useProjectLightColor } from 'src/store/entities/projectLightColors'

type Props = {
  projectIconId: string
  currentProjectIconId: string
  currentProjectLightColorId: string
  currentProjectBaseColorId: string
  onClick: (id: string) => Promise<void>
}

export const IconPickerItem: React.VFC<Props> = memo<Props>((props) => {
  const {
    projectIconId,
    currentProjectBaseColorId,
    currentProjectLightColorId,
    currentProjectIconId,
    onClick,
  } = props
  const { projectIcon } = useProjectIcon(projectIconId)

  const { projectLightColor } = useProjectLightColor(currentProjectLightColorId)
  const { projectBaseColor } = useProjectBaseColor(currentProjectBaseColorId)
  const { _hover, transition } = useLinkHoverStyle({
    color: projectLightColor.color.color,
  })

  const handlePickIcon = useCallback(
    async (id: string) => {
      await onClick(id)
    },
    [onClick],
  )

  return (
    <WrapItem>
      <IconBox
        bg={
          currentProjectIconId === projectIcon.id
            ? projectBaseColor.color.color
            : 'transparent'
        }
        _hover={_hover}
        transition={transition}
        onClick={() => handlePickIcon(projectIcon.id)}
      >
        <AtomsIcon icon={projectIcon.icon.icon as IconType} w={6} h={6} />
      </IconBox>
    </WrapItem>
  )
})
IconPickerItem.displayName = 'IconPickerItem'

const IconBox: React.FC<BoxProps> = (props) => (
  <Center borderRadius="sm" w="44px" h="44px" cursor="pointer" {...props} />
)
