import { Text } from 'src/components/atoms'
import React from 'react'
import { useReactNodeView } from '../ReactNodeView'
import { PopoverProfile } from 'src/components/organisms'
import { MentionAttrs } from 'src/shared/prosemirror/schema'

const teammatesData = [
  {
    id: 1,
    name: 'Manato Kuroda',
    image: '/images/cat_img.png',
    email: 'manato.kuroda@gmail.com',
  },
  {
    id: 2,
    name: 'Dan Abrahmov',
    image: 'https://bit.ly/dan-abramov',
    email: 'dan.abrahmov@gmail.com',
  },
  {
    id: 3,
    name: 'Kent Dodds',
    image: 'https://bit.ly/kent-c-dodds',
    email: 'kent.dodds@gmail.com',
  },
] as const

export const Mention: React.FC = () => {
  const context = useReactNodeView()
  const attrs = context.node?.attrs as MentionAttrs
  const profile = teammatesData.find((t) => t.id === Number(attrs.teammateId))!

  return (
    <PopoverProfile profile={profile}>
      <Text as="span" color="cyan.400" cursor="pointer">
        {profile.email}
      </Text>
    </PopoverProfile>
  )
}
