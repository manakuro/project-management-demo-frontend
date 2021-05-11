import React from 'react'
import { InputWithIcon } from 'src/components/molecules'

export const SearchInput: React.FC = () => {
  return (
    <InputWithIcon
      icon="search"
      placeholder="Search"
      borderRadius="full"
      size="sm"
    />
  )
}
