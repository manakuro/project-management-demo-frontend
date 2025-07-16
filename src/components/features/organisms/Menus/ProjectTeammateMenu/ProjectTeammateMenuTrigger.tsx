import type React from 'react'
import { type PropsWithChildren, memo } from 'react'
import { PopoverTrigger } from 'src/components/ui/organisms/Popover'

type Props = PropsWithChildren

export const ProjectTeammateMenuTrigger: React.FC<Props> = memo<Props>(
  function ProjectTeammateMenuTrigger(props) {
    return <PopoverTrigger>{props.children}</PopoverTrigger>
  },
)
