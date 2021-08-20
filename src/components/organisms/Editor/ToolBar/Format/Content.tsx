import React from 'react'
import { Portal, Stack } from 'src/components/atoms'
import {
  Bold,
  BulletList,
  DecreaseListIndent,
  IncreaseListIndent,
  Italic,
  Link,
  OrderedList,
  Strikethrough,
  Underline,
} from 'src/components/organisms/Editor/ToolBar'
import {
  PopoverContent,
  PopoverProps,
  PopoverBody,
  PopoverArrow,
} from 'src/components/organisms/Popover'
import { useClickOutside } from 'src/hooks'

type Props = {
  onClose?: () => void
} & PopoverProps

export const Content: React.FC<Props> = (props) => {
  const { ref } = useClickOutside(props.onClose)

  return (
    <Portal>
      <PopoverContent w="100%" ref={ref}>
        <PopoverArrow />
        <PopoverBody px={1} py={1}>
          <Stack spacing={1} direction="row" alignItems="center">
            <Bold size="xs" tooltip={{ isDisabled: true }} />
            <Italic size="xs" tooltip={{ isDisabled: true }} />
            <Underline size="xs" tooltip={{ isDisabled: true }} />
            <Strikethrough size="xs" tooltip={{ isDisabled: true }} />
            <BulletList size="xs" tooltip={{ isDisabled: true }} />
            <OrderedList size="xs" tooltip={{ isDisabled: true }} />
            <IncreaseListIndent size="xs" tooltip={{ isDisabled: true }} />
            <DecreaseListIndent size="xs" tooltip={{ isDisabled: true }} />
            <Link size="xs" tooltip={{ isDisabled: true }} />
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Portal>
  )
}
