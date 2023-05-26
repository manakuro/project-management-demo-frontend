import React, { memo } from 'react'
import { InputWithIcon } from 'src/components/ui/molecules'

export const SearchInput: React.FC = memo(() => {
  return (
    <InputWithIcon
      icon="search"
      placeholder="Search"
      borderRadius="full"
      size="sm"
    />
  )
})
SearchInput.displayName = 'SearchInput'
