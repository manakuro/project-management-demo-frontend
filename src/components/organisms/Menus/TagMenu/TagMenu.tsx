import React, { memo } from 'react'
import {
  SearchMenuContent,
  SearchMenuTrigger,
  SearchMenu,
} from 'src/components/organisms/Menus/SearchMenu'
import { PopoverProps } from 'src/components/ui/organisms/Popover'
import { Tag } from 'src/store/entities/tag'
import { Content } from './Content'

type Props = PopoverProps & {
  onSelect: (tag: Tag) => void
  queryText: string
  onClose: () => void
  onClosed?: () => void
}

export const TagMenu: React.FC<Props> = memo<Props>((props) => {
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
TagMenu.displayName = 'TagMenu'
