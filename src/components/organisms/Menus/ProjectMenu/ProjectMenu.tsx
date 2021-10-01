import React, { memo } from 'react'
import {
  SearchMenuContent,
  SearchMenuTrigger,
  SearchMenu,
} from 'src/components/organisms/Menus/SearchMenu'
import { PopoverProps } from 'src/components/organisms/Popover'
import { Content } from './Content'

type Props = PopoverProps & {
  onSelect: (val: string) => void
  queryText: string
  onClose: () => void
  onClosed?: () => void
}

export const ProjectMenu: React.FC<Props> = memo<Props>((props) => {
  const { onClosed, queryText, isOpen, onClose, ...rest } = props

  return (
    <SearchMenu isOpen={isOpen} {...rest}>
      <SearchMenuTrigger>{props.children}</SearchMenuTrigger>
      {isOpen && (
        <SearchMenuContent mr={-3} onClose={onClose}>
          <Content
            onClosed={onClosed}
            onClose={props.onClose}
            onSelect={props.onSelect}
            queryText={queryText}
          />
        </SearchMenuContent>
      )}
    </SearchMenu>
  )
})
