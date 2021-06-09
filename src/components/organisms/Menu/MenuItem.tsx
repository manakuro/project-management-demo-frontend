import {
  MenuItem as ChakraMenuItem,
  MenuItemProps as ChakraMenuItemProps,
} from '@chakra-ui/react'
import React from 'react'

type Props = ChakraMenuItemProps & {
  link?: boolean
}
export type MenuItemProps = Props

export const MenuItem: React.FC<Props> = (props) => {
  const { link, ...rest } = props

  if (link) {
    if (!React.isValidElement(props.children)) {
      console.warn('【Menu/MenuItem】Children must be React component')
      return null
    }

    const element = React.cloneElement(props.children, {
      p: '0.4rem 0.8rem',
      w: 'full',
    })
    return (
      <ChakraMenuItem {...rest} p={0}>
        {element}
      </ChakraMenuItem>
    )
  }

  return <ChakraMenuItem fontSize="sm" {...rest} />
}
