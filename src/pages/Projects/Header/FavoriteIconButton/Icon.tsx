import React, { memo } from 'react'
import { Icon as AtomsIcon } from 'src/components/atoms'

type Props = {
  isFavorite: boolean
}

export const Icon: React.VFC<Props> = memo<Props>((props) => {
  const { isFavorite } = props

  if (isFavorite) return <AtomsIcon icon="fillLike" color="primary" />

  return <AtomsIcon icon="outlineLike" color="text.muted" />
})
Icon.displayName = 'Icon'
