import React, { memo } from 'react'
import {
  PopoverContent,
  PopoverContentProps,
} from 'src/components/organisms/Popover'
import { Flex, Portal } from 'src/components/ui/atoms'
import { useClickOutside } from 'src/hooks'
import { useSearchMenuRef } from '../useSearchMenuRef'

type Props = PopoverContentProps & {
  onClose: () => void
}

export const SearchMenuContent: React.FC<Props> = memo<Props>((props) => {
  const { onClose, children, ...rest } = props
  const { ref } = useClickOutside(onClose, {
    hasClickedOutside: (e, helpers) => {
      if (helpers.isContainInPopoverTrigger(e)) return false
      return true
    },
  })
  const { ref: containerRef } = useSearchMenuRef()

  return (
    <Portal>
      <PopoverContent
        className="focus-visible"
        w="450px"
        maxH={56}
        ref={containerRef}
        {...rest}
      >
        <Flex flexDirection="column" ref={ref}>
          {children}
        </Flex>
      </PopoverContent>
    </Portal>
  )
})
SearchMenuContent.displayName = 'SearchMenuContent'
