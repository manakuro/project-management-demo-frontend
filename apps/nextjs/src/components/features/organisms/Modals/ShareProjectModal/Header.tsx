import { ModalHeader } from '@/components/ui/organisms/Modal';
import { useProject } from '@/store/entities/project';
import type React from 'react';
import { memo } from 'react';

type Props = {
  projectId: string;
};

export const Header: React.FC<Props> = memo<Props>((props) => {
  const { project } = useProject(props.projectId);

  return <ModalHeader>Share {project.name}</ModalHeader>;
});
Header.displayName = 'Header';
