import React, { memo, PropsWithChildren } from 'react'
import { PopoverTrigger } from 'src/components/organisms/Popover'

type Props = PropsWithChildren<{}>

export const ProjectTeammateMenuTrigger: React.FC<Props> = memo<Props>(
  (props) => {
    return <PopoverTrigger>{props.children}</PopoverTrigger>
  },
)
ProjectTeammateMenuTrigger.displayName = 'ProjectTeammateMenuTrigger'
