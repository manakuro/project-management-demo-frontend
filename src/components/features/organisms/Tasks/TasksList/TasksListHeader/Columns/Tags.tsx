import type React from 'react';
import { memo } from 'react';
import { Container } from './Container';

type Props = {
  tasksTaskColumnId: string;
};

export const Tags: React.FC<Props> = memo<Props>((props) => {
  const { tasksTaskColumnId } = props;

  return <Container clickable tasksTaskColumnId={tasksTaskColumnId} menu />;
});
Tags.displayName = 'Tags';
