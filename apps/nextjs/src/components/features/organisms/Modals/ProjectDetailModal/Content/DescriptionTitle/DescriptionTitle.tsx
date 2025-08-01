import { Flex } from '@/components/ui/atoms';
import { useDescriptionTitle } from '@/hooks/pages/projects';
import type React from 'react';
import { memo } from 'react';
import { Input } from './Input';

type Props = {
  projectId: string;
};

export const DescriptionTitle: React.FC<Props> = memo<Props>((props) => {
  const { descriptionTitle, onChange } = useDescriptionTitle(props);

  return (
    <Flex>
      <Input value={descriptionTitle} onChange={onChange} />
    </Flex>
  );
});
DescriptionTitle.displayName = 'DescriptionTitle';
