import React, { memo } from 'react'
import { TeammateAvatar } from 'src/components/features/organisms/TeammateAvatar'

type Props = {
  teammateId: string
}

export const Teammate: React.FC<Props> = memo((props) => {
  return <TeammateAvatar teammateId={props.teammateId} size="xs" />
})
Teammate.displayName = 'Teammate'
