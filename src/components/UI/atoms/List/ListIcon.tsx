import React from 'react'
import { ListIcon as ChakraListIcon } from '@chakra-ui/react'
import { BiHome } from 'react-icons/bi'

type Props = React.ComponentProps<typeof ChakraListIcon> & {
  icon: Icon
}

export const ListIcon: React.FC<Props> = (props) => {
  const icon = icons[props.icon]

  return <ChakraListIcon as={icon} {...props} />
}

const icons = {
  home: BiHome,
} as const

type Icon = keyof typeof icons
