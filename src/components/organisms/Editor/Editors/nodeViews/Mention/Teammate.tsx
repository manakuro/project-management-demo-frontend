import React, { memo } from 'react'
import { useReactNodeView } from 'src/components/organisms/Editor/Editors/ReactNodeView'
import { PopoverProfile } from 'src/components/organisms'
import { MentionAttrs } from 'src/shared/prosemirror/schema'
import { MentionText } from './MentionText'
import { useTeammate } from 'src/store/entities/teammates'

export const Teammate: React.FC = memo(() => {
  const context = useReactNodeView()
  const attrs = context.node?.attrs as MentionAttrs
  const { teammate } = useTeammate(attrs.mentionId)

  return (
    <PopoverProfile
      profile={{
        name: teammate.name,
        email: teammate.email,
        image: teammate.image,
      }}
    >
      <MentionText>{teammate.email + ' '}</MentionText>
    </PopoverProfile>
  )
})
