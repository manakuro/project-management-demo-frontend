import React from 'react'
import {
  Icon as AtomsIcon,
  BoxProps,
  Wrap,
  WrapItem,
  Center,
} from 'src/components/atoms'
import { useLinkHoverStyle } from 'src/hooks'
import { useProjectBaseColor } from 'src/store/entities/projectBaseColors'
import { useProjectLightColor } from 'src/store/entities/projectLightColors'
import { projectIcons } from 'src/store/entities/projects/projectIcons'

type Props = {
  currentIconId: string
  currentProjectLightColorId: string
  currentProjectBaseColorId: string
}

export const IconPicker: React.VFC<Props> = (props) => {
  const { projectLightColor } = useProjectLightColor(
    props.currentProjectLightColorId,
  )
  const { projectBaseColor } = useProjectBaseColor(
    props.currentProjectBaseColorId,
  )
  const { _hover, transition } = useLinkHoverStyle({
    color: projectLightColor.color.color,
  })

  return (
    <Wrap p={6} spacing={1} overflowY="scroll" maxH={60}>
      {projectIcons.map((c) => (
        <WrapItem key={c.id}>
          <IconBox
            bg={
              props.currentIconId === c.id
                ? projectBaseColor.color.color
                : 'transparent'
            }
            _hover={_hover}
            transition={transition}
          >
            <AtomsIcon icon={c.icon} w={6} h={6} />
          </IconBox>
        </WrapItem>
      ))}
    </Wrap>
  )
}

const IconBox: React.FC<BoxProps> = (props) => (
  <Center borderRadius="sm" w="44px" h="44px" cursor="pointer" {...props} />
)
