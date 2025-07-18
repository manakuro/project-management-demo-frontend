import type React from 'react';
import { Flex, type FlexProps } from 'src/components/ui/atoms';

type Props = FlexProps;

export const OverviewSectionHeader: React.FC<Props> = (props) => (
  <Flex
    py={2}
    borderBottom="2px"
    borderColor="gray.200"
    borderStyle="solid"
    alignItems="center"
    h="50px"
  >
    {props.children}
  </Flex>
);

OverviewSectionHeader.displayName = 'OverviewSectionHeader';
