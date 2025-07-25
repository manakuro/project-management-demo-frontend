import type React from 'react';
import { memo, useCallback, useMemo, useState } from 'react';
import { TeammateAvatar } from 'src/components/features/organisms/TeammateAvatar';
import {
  Box,
  Button,
  type ButtonProps,
  Text,
  type TextProps,
} from 'src/components/ui/atoms';
import { useHover } from 'src/hooks/useHover';
import { useOwnerTeammateIdsByProjectId } from 'src/store/entities/projectTeammate';
import { useTeammate } from 'src/store/entities/teammate';
import { DeleteButton } from './DeleteButton';
import { Input } from './Input';

type Props = {
  projectId: string;
};

const focusedStyle: ButtonProps = {
  bg: 'transparent',
  border: '1px',
  borderColor: 'gray.200',
  _hover: {
    bg: 'transparent',
  },
};

export const ProjectOwner: React.FC<Props> = memo<Props>((props) => {
  const { projectId } = props;
  const { ref, isHovering } = useHover();
  const [focused, setFocused] = useState(false);
  const { projectTeammate } = useOwnerTeammateIdsByProjectId(projectId);
  const { teammate } = useTeammate(projectTeammate.teammateId);
  const hasOwner = useMemo(() => !!teammate.id, [teammate.id]);
  const name = useMemo(
    () => (hasOwner ? teammate.name : 'No Owner'),
    [hasOwner, teammate.name],
  );
  const nameStyle = useMemo<TextProps>(
    () => (hasOwner ? { color: 'text.base' } : { color: 'text.muted' }),
    [hasOwner],
  );

  const handleClick = useCallback(() => {
    setFocused(true);
  }, []);

  const handleClickInputOutside = useCallback(() => {
    setFocused(false);
  }, []);

  return (
    <Button
      as={Box}
      variant="ghost"
      size="sm"
      ref={ref}
      border="1px"
      borderColor="transparent"
      onClick={handleClick}
      cursor="pointer"
      {...(focused ? focusedStyle : {})}
    >
      <TeammateAvatar teammateId={teammate.id} size="xs" />
      {focused ? (
        <Input projectId={projectId} onClose={handleClickInputOutside} />
      ) : (
        <>
          <Text ml={2} fontSize="sm" {...nameStyle}>
            {name}
          </Text>
          {hasOwner && (
            <DeleteButton
              isHovering={isHovering}
              projectTeammateId={projectTeammate.id}
            />
          )}
        </>
      )}
    </Button>
  );
});
ProjectOwner.displayName = 'ProjectOwner';
