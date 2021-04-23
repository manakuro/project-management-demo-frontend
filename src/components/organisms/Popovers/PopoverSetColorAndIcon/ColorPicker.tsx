import React, { useCallback } from 'react'
import { Icon, Wrap, WrapItem, ColorBox } from 'src/components/atoms'
import { useColorPicker } from 'src/hooks/useColorPicker'
import { useProject } from 'src/store/projects'

type Props = {
  currentId: string
  projectId: string
}

export const ColorPicker: React.VFC<Props> = (props) => {
  const { colors } = useColorPicker()
  const { setColor } = useProject(props.projectId)

  const handlePickColor = useCallback(
    async (id: string) => {
      await setColor(props.projectId, id)
    },
    [props.projectId, setColor],
  )

  return (
    <Wrap p={6} spacing={1}>
      {colors.map((c) => (
        <WrapItem key={c.id}>
          <ColorBox
            size="lg"
            cursor="pointer"
            color={c.base}
            onClick={() => handlePickColor(c.id)}
          >
            {props.currentId === c.id && <Icon icon="check" color="white" />}
          </ColorBox>
        </WrapItem>
      ))}
    </Wrap>
  )
}
