import React, { memo } from 'react'
import {
  ProjectTeammateMenu,
  ProjectTeammateMenuTrigger,
  ProjectTeammateMenuContent,
} from 'src/components/organisms/Menus/ProjectTeammateMenu'
import {
  PopoverContentProps,
  PopoverProps,
} from 'src/components/organisms/Popover'
import { Teammate } from 'src/store/entities/teammates'
import { Content } from './Content'

type Props = PopoverProps & {
  onSelect: (val: Teammate) => void
  queryText: string
  onClose: () => void
  onClosed?: () => void
  contentStyle?: PopoverContentProps
}

export const AssignProjectOwnerMenu: React.FC<Props> = memo<Props>((props) => {
  const {
    onClosed,
    queryText,
    contentStyle,
    onSelect,
    onClose,
    isOpen,
    ...rest
  } = props

  return (
    <ProjectTeammateMenu isOpen={isOpen} {...rest}>
      <ProjectTeammateMenuTrigger>{props.children}</ProjectTeammateMenuTrigger>
      {isOpen && (
        <ProjectTeammateMenuContent onClose={onClose} {...contentStyle}>
          <Content
            onSelect={onSelect}
            onClosed={onClosed}
            onClose={onClose}
            queryText={queryText}
          />
        </ProjectTeammateMenuContent>
      )}
    </ProjectTeammateMenu>
  )
})
AssignProjectOwnerMenu.displayName = 'AssignProjectOwnerMenu'
