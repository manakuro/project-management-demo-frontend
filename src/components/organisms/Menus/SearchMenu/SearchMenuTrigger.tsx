import React, { memo } from 'react'
import { PopoverTrigger } from 'src/components/organisms/Popover'

type Props = {}

export const SearchMenuTrigger: React.FC<Props> = memo<Props>((props) => {
  return <PopoverTrigger>{props.children}</PopoverTrigger>
})
SearchMenuTrigger.displayName = 'SearchMenuTrigger'
