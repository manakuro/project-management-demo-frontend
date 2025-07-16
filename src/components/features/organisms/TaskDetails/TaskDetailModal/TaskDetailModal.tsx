import type React from 'react';
import { memo, useCallback } from 'react';
import { useTaskDetail } from 'src/components/features/organisms/TaskDetail';
import { Modal, ModalOverlay } from 'src/components/ui/organisms/Modal';
import { Content } from './Content';
import { useTaskDetailModal } from './useTaskDetailModal';

type Props = {
  backToPage: () => Promise<void>;
};

export const TaskDetailModal: React.FC<Props> = memo((props) => {
  const { isOpen, onClose } = useTaskDetailModal();
  const { loading } = useTaskDetail();

  const handleClose = useCallback(() => {
    onClose();
    props.backToPage();
  }, [onClose, props]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="4xl"
      scrollBehavior="inside"
    >
      <ModalOverlay />
      {isOpen && <Content loading={loading} onClose={handleClose} />}
    </Modal>
  );
});
TaskDetailModal.displayName = 'TaskDetailModal';
