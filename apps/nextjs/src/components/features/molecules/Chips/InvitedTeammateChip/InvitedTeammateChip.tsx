import type React from 'react';
import { memo, useCallback } from 'react';
import { TeammateAvatar } from 'src/components/features/organisms/TeammateAvatar';
import { Badge, Box, Button, Icon, Text } from 'src/components/ui/atoms';
import { useClickableHoverStyle } from 'src/hooks';
import type { Teammate } from 'src/store/entities/teammate';

type Variant = 'badge' | 'button';

type Props = {
  teammate: Teammate;
  variant: Variant;
  onDelete?: (teammateId: string) => void;
  deletable?: boolean;
  onClick?: () => void;
};

export const InvitedTeammateChip: React.FC<Props> = memo((props) => {
  const { teammate, onClick } = props;
  const { clickableHoverLightStyle } = useClickableHoverStyle();

  const handleDelete = useCallback(
    (e: React.MouseEvent<SVGElement>) => {
      e.stopPropagation();
      props.onDelete?.(teammate.id);
    },
    [props, teammate.id],
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      onClick?.();
    },
    [onClick],
  );

  if (props.variant === 'badge') {
    return (
      <Badge variant="solid" textAlign="center" onClick={handleClick}>
        {teammate.name}
      </Badge>
    );
  }

  return (
    <Button
      as={Box}
      size="xs"
      border="1px"
      borderColor="transparent"
      cursor="pointer"
      borderRadius="full"
      minH={6}
      h={6}
      _hover={{ bg: 'gray.100' }}
    >
      <TeammateAvatar teammateId={teammate.id} size="xs" />
      <Text ml={2} fontSize="xs" noOfLines={1} color="text.base">
        {teammate.name}
      </Text>
      {props.deletable && (
        <Icon
          ml={1}
          mt="1px"
          icon="x"
          color="text.muted"
          size="sm"
          {...clickableHoverLightStyle}
          onClick={handleDelete}
        />
      )}
    </Button>
  );
});
InvitedTeammateChip.displayName = 'InvitedTeammateChip';
