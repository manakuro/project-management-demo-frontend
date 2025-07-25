import type React from 'react';
import { useCallback } from 'react';
import { Flex, Icon, Text } from 'src/components/ui/atoms';
import { transitions } from 'src/styles';
import { type Item, PADDING_X } from './GuideListItem';

type Props = {
  item: Item;
  onToggle: (id: number) => void;
};

export const ListItem: React.FC<Props> = (props) => {
  const { item, onToggle } = props;
  const icon = item.done ? item.iconDone : item.icon;

  const handleToggle = useCallback(() => {
    onToggle(item.id);
  }, [item.id, onToggle]);

  return (
    <Flex
      px={PADDING_X}
      py={2}
      cursor="pointer"
      bg="rgba(255,255,255,.04)"
      border="1px"
      borderColor="navigation.hover.dark"
      borderRadius="md"
      alignItems="center"
      _hover={{
        bg: 'navigation.hover.dark',
      }}
      transition={transitions.base()}
      transitionProperty="background"
      height="40px"
      onClick={handleToggle}
    >
      <Icon icon={icon.name} color={icon.color} mr={PADDING_X} />
      <Text fontSize="sm" fontWeight="bold" flex={1}>
        {item.title}
      </Text>
      <Icon icon="chevronRight" />
    </Flex>
  );
};
