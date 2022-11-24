import React, { memo } from 'react'
import { Spinner } from 'src/components/atoms'
import { SearchMenuListItem } from '../SearchMenuListItem'

type Props = {}

export const SearchMenuLoading: React.FC<Props> = memo<Props>(() => {
  return (
    <SearchMenuListItem index={-1} alignItems="center" justifyContent="center">
      <Spinner size="sm" color="gray.400" emptyColor="gray.200" />
    </SearchMenuListItem>
  )
})
SearchMenuLoading.displayName = 'SearchMenuLoading'
