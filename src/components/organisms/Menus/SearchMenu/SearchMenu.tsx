import React, { memo } from 'react'
import { Popover, PopoverProps } from 'src/components/organisms/Popover'
import { PortalManager } from 'src/components/ui/atoms'

type Props = PopoverProps

export const SearchMenu: React.FC<Props> = memo<Props>((props) => {
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
SearchMenu.displayName = 'SearchMenu'
