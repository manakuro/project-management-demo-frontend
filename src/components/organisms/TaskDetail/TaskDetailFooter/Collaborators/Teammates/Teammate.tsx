import React, { memo } from 'react'
import { TeammateAvatar } from 'src/components/organisms'

type Props = {
  teammateId: string
}

export const Teammate: React.VFC<Props> = memo((props) => {
  return <TeammateAvatar teammateId={props.teammateId} size="xs" />
})
Teammate.displayName = 'Teammate'
