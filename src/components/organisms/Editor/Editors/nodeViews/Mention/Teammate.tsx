import React, { memo } from 'react'
import { useReactNodeView } from 'src/components/organisms/Editor/Editors/ReactNodeView'
import { PopoverProfile } from 'src/components/organisms'
import { MentionAttrs } from 'src/shared/prosemirror/schema'
import { MentionText } from './MentionText'

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

export const Teammate: React.FC = memo(() => {
  const context = useReactNodeView()
  const attrs = context.node?.attrs as MentionAttrs

  const profile = teammatesData.find((t) => t.id === Number(attrs.mentionId))!
  return (
    <PopoverProfile profile={profile}>
      <MentionText>{profile.email + ' '}</MentionText>
    </PopoverProfile>
  )
})
