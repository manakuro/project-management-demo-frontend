import React, { memo } from 'react'
import { useReactNodeView } from 'src/components/organisms/Editor/Editors/ReactNodeView'
import { PopoverProfile } from 'src/components/organisms/Popovers'
import { MentionAttrs } from 'src/shared/prosemirror/schema'
import { useTeammate } from 'src/store/entities/teammate'
import { MentionText } from './MentionText'

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
Teammate.displayName = 'Teammate'
