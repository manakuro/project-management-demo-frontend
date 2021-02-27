import React from 'react'
import { Icon, BoxProps, Wrap, WrapItem, Center } from 'src/components/atoms'

type Props = {
  currentId: number
}
const colors = [
  {
    id: 1,
    name: 'gray',
    color: 'gray.400',
  },

  {
    id: 2,
    name: 'red',
    color: 'red.400',
  },

  {
    id: 3,
    name: 'orange',
    color: 'orange.400',
  },

  {
    id: 4,
    name: 'yellow',
    color: 'yellow.400',
  },

  {
    id: 5,
    name: 'green',
    color: 'green.400',
  },

  {
    id: 6,
    name: 'teal',
    color: 'teal.400',
  },

  {
    id: 7,
    name: 'blue',
    color: 'blue.400',
  },

  {
    id: 8,
    name: 'cyan',
    color: 'cyan.400',
  },

  {
    id: 9,
    name: 'purple',
    color: 'purple.400',
  },

  {
    id: 10,
    name: 'pink',
    color: 'pink.400',
  },
]

export const ColorPicker: React.VFC<Props> = (props) => {
  return (
    <Wrap p={6} spacing={1}>
      {colors.map((c) => (
        <WrapItem key={c.id}>
          <ColorBox bg={c.color}>
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
