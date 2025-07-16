import type React from 'react';
import { useEffect } from 'react';
import { Flex } from 'src/components/ui/atoms';
import {
  Tooltip as MoleculesTooltip,
  type TooltipProps,
} from 'src/components/ui/molecules';
import { useDisclosure } from 'src/shared/chakra';
import { useTaskFile } from 'src/store/entities/taskFile';
import { useThumbnailAttachmentContext } from './Provider';

type Props = Omit<TooltipProps, 'label' | 'size'> & {
  taskFileId: string;
};

export const Tooltip: React.FC<Props> = (props) => {
  const { taskFileId, children, ...rest } = props;
  const { taskFile } = useTaskFile(taskFileId);
  const tooltipDisclosure = useDisclosure();
  const { isHovering, thumbnailMenuOpened } = useThumbnailAttachmentContext();

  useEffect(() => {
    if (!thumbnailMenuOpened && isHovering) {
      setTimeout(() => {
        tooltipDisclosure.onOpen();
      }, props.openDelay ?? 0);
    } else {
      tooltipDisclosure.onClose();
    }
  }, [isHovering, props.openDelay, thumbnailMenuOpened, tooltipDisclosure]);

  return (
    <MoleculesTooltip
      isOpen={tooltipDisclosure.isOpen}
      hasArrow
      label={taskFile.name}
      aria-label={taskFile.src}
      size="sm"
      {...rest}
    >
      <Flex>{children}</Flex>
    </MoleculesTooltip>
  );
};
