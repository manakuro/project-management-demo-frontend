import { memo } from 'react';
import { Flex } from 'src/components/ui/atoms';
import { ProjectList } from './ProjectList';

export const Projects = memo(function Projects() {
  return (
    <Flex flexDirection="column" flex={1}>
      <ProjectList />
    </Flex>
  );
});
