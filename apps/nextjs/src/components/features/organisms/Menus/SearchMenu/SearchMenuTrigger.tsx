import { type PropsWithChildren, memo } from 'react';
import { PopoverTrigger } from 'src/components/ui/organisms/Popover';

type Props = PropsWithChildren;

export const SearchMenuTrigger = memo<Props>(function SearchMenuTrigger(props) {
  return <PopoverTrigger>{props.children}</PopoverTrigger>;
});
