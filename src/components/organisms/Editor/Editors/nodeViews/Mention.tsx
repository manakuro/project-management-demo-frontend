import { Text } from 'src/components/atoms'
import React from 'react'
import { useReactNodeView } from '../ReactNodeView'
import { PopoverProfile } from 'src/components/organisms'

type Attrs = {
  name: string
}

export const Mention: React.FC = (props) => {
  const context = useReactNodeView()
  console.log('Mention!: ', context, props.children)
  const attrs = context.node?.attrs as Attrs

  return (
    <PopoverProfile
      profile={{
        name: 'Manato Kuroda',
        image: '/images/cat_img.png',
        email: 'manato.kuroda@gmail.com',
      }}
    >
      <Text as="span" color="cyan.400" cursor="pointer">
        {attrs.name}
      </Text>
    </PopoverProfile>
  )
}
