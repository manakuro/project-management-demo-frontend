import React, { memo, useCallback } from 'react'
import { Icon, WrapItem, ColorBox } from 'src/components/atoms'
import { useProjectBaseColor } from 'src/store/entities/projectBaseColors'

type Props = {
  projectBaseColorId: string
  currentProjectBaseColorId: string
  onClick: (id: string) => Promise<void>
}

export const ColorPickerItem: React.VFC<Props> = memo<Props>((props) => {
  const { projectBaseColorId, currentProjectBaseColorId, onClick } = props
  const { projectBaseColor } = useProjectBaseColor(projectBaseColorId)

  const handlePickColor = useCallback(
    async (id: string) => {
      await onClick(id)
    },
    [onClick],
  )

  return (
    <WrapItem>
      <ColorBox
        size="lg"
        cursor="pointer"
        color={projectBaseColor.color.color}
        onClick={() => handlePickColor(projectBaseColor.id)}
      >
        {currentProjectBaseColorId === projectBaseColor.id && (
          <Icon icon="check" color="white" />
        )}
      </ColorBox>
    </WrapItem>
  )
})
ColorPickerItem.displayName = 'ColorPickerItem'
