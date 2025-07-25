import type React from 'react';
import { memo, useCallback } from 'react';
import { ColorBox, Icon, WrapItem } from 'src/components/ui/atoms';
import { useProjectBaseColor } from 'src/store/entities/projectBaseColor';

type Props = {
  projectBaseColorId: string;
  currentProjectBaseColorId: string;
  onClick: (id: string) => Promise<void>;
};

export const ColorPickerItem: React.FC<Props> = memo<Props>((props) => {
  const { projectBaseColorId, currentProjectBaseColorId, onClick } = props;
  const { projectBaseColor } = useProjectBaseColor(projectBaseColorId);

  const handlePickColor = useCallback(
    async (id: string) => {
      await onClick(id);
    },
    [onClick],
  );

  return (
    <WrapItem>
      <ColorBox
        size="lg"
        cursor="pointer"
        color={projectBaseColor.color.color}
        onClick={() => handlePickColor(projectBaseColor.id)}
      >
        {currentProjectBaseColorId === projectBaseColor.id && (
          <Icon icon="check" color="white" />
        )}
      </ColorBox>
    </WrapItem>
  );
});
ColorPickerItem.displayName = 'ColorPickerItem';
