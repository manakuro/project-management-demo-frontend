import React, { memo } from 'react'
import { Favorites } from './Favorites'
import { Reports } from './Reports'

type Props = {}

export const CustomNav: React.VFC<Props> = memo((props) => {
  return (
    <>
      <Favorites />
      <Reports />
    </>
  )
})
