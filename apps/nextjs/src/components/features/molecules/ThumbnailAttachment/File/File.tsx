import { AttachmentBox } from '@/components/features/molecules/AttachmentBox';
import { Container } from '@/components/features/molecules/ThumbnailAttachment/Container';
import { Menu } from '@/components/features/molecules/ThumbnailAttachment/Menu';
import { MenuButton } from '@/components/features/molecules/ThumbnailAttachment/MenuButton';
import { useThumbnailAttachmentContext } from '@/components/features/molecules/ThumbnailAttachment/Provider';
import { Tooltip } from '@/components/features/molecules/ThumbnailAttachment/Tooltip';
import type { FlexProps } from '@/components/ui/atoms';
import type React from 'react';

type Props = FlexProps & {
  taskFileId: string;
};

export const File: React.FC<Props> = (props) => {
  const { taskFileId, ...rest } = props;
  const { isHovering } = useThumbnailAttachmentContext();

  return (
    <Tooltip taskFileId={taskFileId} openDelay={500}>
      <Container {...rest}>
        <AttachmentBox
          size="md"
          taskFileId={taskFileId}
          isHovering={isHovering}
        />
        <Menu taskFileId={taskFileId}>
          <MenuButton color="text.muted" />
        </Menu>
      </Container>
    </Tooltip>
  );
};
