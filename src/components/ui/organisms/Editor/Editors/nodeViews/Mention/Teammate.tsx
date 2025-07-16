import type React from 'react'
import { memo } from 'react'
import { PopoverProfile } from 'src/components/features/organisms/Popovers'
import { useReactNodeView } from 'src/components/ui/organisms/Editor/Editors/ReactNodeView'
import type { MentionAttrs } from 'src/shared/prosemirror/schema'
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
      <MentionText>{`${teammate.email} `}</MentionText>
    </PopoverProfile>
  )
})
Teammate.displayName = 'Teammate'
