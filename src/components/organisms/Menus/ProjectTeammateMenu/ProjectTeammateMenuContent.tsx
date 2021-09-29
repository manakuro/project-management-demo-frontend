import React, { memo } from 'react'
import { Portal } from 'src/components/atoms'
import {
  PopoverContent,
  PopoverContentProps,
} from 'src/components/organisms/Popover'
import { useClickOutside } from 'src/hooks'

type Props = PopoverContentProps & {
  onClose: () => void
}

export const ProjectTeammateMenuContent: React.FC<Props> = memo<Props>(
  (props) => {
    const { onClose, ...rest } = props
    const { ref } = useClickOutside(onClose)

    return (
      <Portal>
        <PopoverContent
          className="focus-visible"
          w="450px"
          ref={ref}
          {...rest}
        />
      </Portal>
    )
  },
)
ProjectTeammateMenuContent.displayName = 'ProjectTeammateMenuContent'
