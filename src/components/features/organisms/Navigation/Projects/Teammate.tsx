import React, { memo } from 'react'
import { TeammateAvatar } from 'src/components/features/organisms/TeammateAvatar'
import { WrapItem } from 'src/components/ui/atoms'

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
