import React, { memo } from 'react'
import { useSearchMenuRef } from 'src/components/features/organisms/Menus/SearchMenu'
import { Flex, Portal } from 'src/components/ui/atoms'
import {
  PopoverContent,
  PopoverContentProps,
} from 'src/components/ui/organisms/Popover'
import { useClickOutside } from 'src/hooks'

type Props = PopoverContentProps & {
  onClose: () => void
}

export const ProjectTeammateMenuContent: React.FC<Props> = memo<Props>(
  (props) => {
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
          overflowY="scroll"
          {...rest}
        >
          <Flex flexDirection="column" ref={ref}>
            {children}
          </Flex>
        </PopoverContent>
      </Portal>
    )
  },
)
ProjectTeammateMenuContent.displayName = 'ProjectTeammateMenuContent'
