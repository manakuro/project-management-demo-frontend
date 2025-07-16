import type React from 'react';
import { memo, useEffect, useMemo } from 'react';
import { Flex, type FlexProps } from 'src/components/ui/atoms';
import { useMenuStyle } from 'src/hooks';
import { useHover } from 'src/hooks/useHover';
import { useSearchMenuIndex } from '../useSearchMenuIndex';

type Props = FlexProps & {
  index: number;
};

export const SearchMenuListItem: React.FC<Props> = memo<Props>((props) => {
  const styles = useMenuStyle().item;
  const { ref, isHovering } = useHover();
  const { selectedIndex, setSelectedIndex } = useSearchMenuIndex();

  styles._hover = undefined;

  useEffect(() => {
    if (isHovering) setSelectedIndex(props.index);
  }, [isHovering, props.index, setSelectedIndex]);

  const selected = useMemo(
    () => props.index === selectedIndex,
    [props.index, selectedIndex],
  );

  return (
    <Flex
      ref={ref}
      {...styles}
      bg={selected ? styles._focus.bg : 'transparent'}
      fontSize="sm"
      {...props}
    />
  );
});
SearchMenuListItem.displayName = 'SearchMenuListItem';
