import React, { memo } from 'react'
import { WrapItem } from 'src/components/atoms'
import { TeammateAvatar } from 'src/components/organisms/TeammateAvatar'

type Props = {
  teammateId: string
}

export const Teammate: React.FC<Props> = memo((props) => {
  return (
    <WrapItem>
      <TeammateAvatar teammateId={props.teammateId} size="xs" />
    </WrapItem>
  )
})
Teammate.displayName = 'Teammate'
