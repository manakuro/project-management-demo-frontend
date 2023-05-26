import React, { memo } from 'react'
import { PortalManager } from 'src/components/ui/atoms'
import { Popover, PopoverProps } from 'src/components/ui/organisms/Popover'

type Props = PopoverProps

export const ProjectTeammateMenu: React.FC<Props> = memo<Props>((props) => {
  return (
    <PortalManager zIndex={1500}>
      <Popover
        closeOnBlur={false}
        autoFocus={false}
        returnFocusOnClose={false}
        isLazy
        lazyBehavior="keepMounted"
        {...props}
      />
    </PortalManager>
  )
})
ProjectTeammateMenu.displayName = 'ProjectTeammateMenu'
