import React from 'react'
import { Icon, BoxProps, Wrap, WrapItem, Center } from 'src/components/atoms'
import { useColorPicker } from 'src/hooks/useColorPicker'

type Props = {
  currentId: number
}

export const ColorPicker: React.VFC<Props> = (props) => {
  const { colors } = useColorPicker()

  return (
    <Wrap p={6} spacing={1}>
      {colors.map((c) => (
        <WrapItem key={c.id}>
          <ColorBox bg={c.base}>
            {props.currentId === c.id && <Icon icon="check" color="white" />}
          </ColorBox>
        </WrapItem>
      ))}
    </Wrap>
  )
}

const ColorBox: React.FC<BoxProps> = (props) => (
  <Center borderRadius="sm" w={5} h={5} cursor="pointer" {...props} />
)
