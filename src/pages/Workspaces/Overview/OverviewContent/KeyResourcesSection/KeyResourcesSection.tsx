import { Flex } from 'src/components/ui/atoms';
import { OverviewContentHeading } from '../OverviewContentHeading';
import { KeyResourcesEmpty } from './KeyResourcesEmpty';

export function KeyResourcesSection() {
  return (
    <Flex flexDirection="column" mt={8}>
      <OverviewContentHeading>Key resources</OverviewContentHeading>
      <KeyResourcesEmpty />
    </Flex>
  );
}
