import { memo } from 'react';
import { Flex, Spinner } from 'src/components/ui/atoms';

export const PopoverEditorLinkLoading = memo(
  function PopoverEditorLinkLoading() {
    return (
      <Flex alignItems="center" justifyContent="center">
        <Spinner size="sm" color="gray.400" emptyColor="gray.200" />
      </Flex>
    );
  },
);
