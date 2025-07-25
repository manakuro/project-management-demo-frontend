import type React from 'react';
import { memo } from 'react';
import { Avatar, Flex, type FlexProps, Text } from 'src/components/ui/atoms';
import type { Mention } from 'src/store/entities/mention';
import { useTeammate } from 'src/store/entities/teammate';
import { LeftContainer } from './LeftContainer';
import { RightContainer } from './RightContainer';

type Props = FlexProps & {
  mention: Mention;
};

export const Teammate: React.FC<Props> = memo<Props>((props) => {
  const { teammate } = useTeammate(props.mention.id);

  return (
    <Flex alignItems="center" flex={1}>
      <LeftContainer>
        <Avatar
          name={teammate.name}
          src={teammate.image}
          size="xs"
          cursor="pointer"
          bg="teal.200"
        />
      </LeftContainer>
      <RightContainer>
        <Text fontSize="sm">{teammate.name}</Text>
        <Text ml={5} fontSize="xs" color="text.muted">
          {teammate.email}
        </Text>
      </RightContainer>
    </Flex>
  );
});
Teammate.displayName = 'Teammate';
