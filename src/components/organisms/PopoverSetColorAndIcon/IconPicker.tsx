import React from 'react'
import {
  Icon as AtomsIcon,
  BoxProps,
  Wrap,
  WrapItem,
  Center,
  IconType,
} from 'src/components/atoms'
import { useLinkHover } from 'src/hooks'

type Props = {
  currentId: number
}
type Icon = {
  id: number
  icon: IconType
}

const icons: Icon[] = [
  {
    id: 1,
    icon: 'play',
  },

  {
    id: 2,
    icon: 'home',
  },

  {
    id: 3,
    icon: 'moon',
  },

  {
    id: 4,
    icon: 'sun',
  },

  {
    id: 5,
    icon: 'menu',
  },

  {
    id: 6,
    icon: 'codeAlt',
  },

  {
    id: 7,
    icon: 'rocket',
  },

  {
    id: 8,
    icon: 'idCard',
  },

  {
    id: 9,
    icon: 'trashAlt',
  },
  {
    id: 10,
    icon: 'task',
  },
  {
    id: 11,
    icon: 'bell',
  },
  {
    id: 12,
    icon: 'notification',
  },
  {
    id: 13,
    icon: 'barChart',
  },
  {
    id: 14,
    icon: 'bookOpen',
  },
  {
    id: 15,
    icon: 'layerPlus',
  },
  {
    id: 16,
    icon: 'mobile',
  },
  {
    id: 17,
    icon: 'movie',
  },
  {
    id: 18,
    icon: 'shapePolygon',
  },
  {
    id: 19,
    icon: 'spreadsheet',
  },
  {
    id: 20,
    icon: 'layout',
  },
]

export const IconPicker: React.VFC<Props> = (props) => {
  const { _hover, transition } = useLinkHover({ color: 'pink.200' })

  return (
    <Wrap p={6} spacing={1} overflowY="scroll" maxH={60}>
      {icons.map((c) => (
        <WrapItem key={c.id}>
          <IconBox
            bg={props.currentId === c.id ? 'pink.400' : 'transparent'}
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
