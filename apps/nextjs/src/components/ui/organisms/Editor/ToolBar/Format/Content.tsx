import { Portal, Stack } from '@/components/ui/atoms';
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
} from '@/components/ui/organisms/Editor/ToolBar';
import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  type PopoverProps,
} from '@/components/ui/organisms/Popover';
import { useClickOutside } from '@/hooks';
import type React from 'react';

type Props = {
  onClose?: () => void;
} & PopoverProps;

export const Content: React.FC<Props> = (props) => {
  const { ref } = useClickOutside(props.onClose);

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
  );
};
