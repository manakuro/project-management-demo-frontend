import React from 'react'
import { ListIcon as ChakraListIcon } from '@chakra-ui/react'
import { Icon, IconType } from 'src/components/UI/atoms'

type Props = React.ComponentProps<typeof ChakraListIcon> & {
  icon: IconType
}

export const ListIcon: React.FC<Props> = (props) => {
  return (
    <ChakraListIcon as={() => <Icon icon={props.icon} mr={2} />} {...props} />
  )
}
