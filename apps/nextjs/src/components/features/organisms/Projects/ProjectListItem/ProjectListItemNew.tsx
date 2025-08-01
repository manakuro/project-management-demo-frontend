import { ComingSoonTooltip } from '@/components/features/molecules/Tooltips';
import { Flex, type FlexProps, Text } from '@/components/ui/atoms';
import { NewBox } from '@/components/ui/molecules/NewBox';
import { useClickableHoverStyle } from '@/hooks';
import type React from 'react';
import { Container } from './Container';

type Props = FlexProps;

export const ProjectListItemNew: React.FC<Props> = (props) => {
  const { clickableHoverLightStyle } = useClickableHoverStyle();

  return (
    <Container {...props}>
      <ComingSoonTooltip>
        <NewBox size="md" />
        <Flex ml={3} flex={1} alignItems="center">
          <Text fontSize="sm" {...clickableHoverLightStyle}>
            New Project
          </Text>
        </Flex>
      </ComingSoonTooltip>
    </Container>
  );
};
ProjectListItemNew.displayName = 'ProjectListItemNew';
