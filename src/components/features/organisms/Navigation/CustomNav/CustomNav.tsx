import React, { memo } from 'react'
import { Favorites } from './Favorites'
import { SavedSearches } from './SavedSearches'

type Props = {}

export const CustomNav: React.FC<Props> = memo(() => {
  return (
    <>
      <Favorites />
      <SavedSearches />
    </>
  )
})
CustomNav.displayName = 'CustomNav'
