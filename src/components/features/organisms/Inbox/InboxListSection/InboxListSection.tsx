import type React from 'react';
import { memo } from 'react';
import { Flex, type FlexProps } from 'src/components/ui/atoms';
import { InboxListHeader } from '../InboxListHeader';
import { InboxListItem } from '../InboxListItem';

type Props = FlexProps & {
  listItemIds: string[];
  sectionText: string;
};

export const InboxListSection: React.FC<Props> = memo<Props>((props) => {
  const { listItemIds, sectionText, ...rest } = props;

  if (!listItemIds.length) return null;

  return (
    <Flex flexDirection="column" flex={1} {...rest}>
      <InboxListHeader>{sectionText}</InboxListHeader>
      {listItemIds.map((id) => (
        <InboxListItem listItemId={id} key={id} />
      ))}
    </Flex>
  );
});

InboxListSection.displayName = 'InboxListSection';
