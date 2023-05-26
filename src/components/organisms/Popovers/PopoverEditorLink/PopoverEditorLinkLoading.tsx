import React, { memo } from 'react'
import { Flex, Spinner } from 'src/components/ui/atoms'

type Props = {}

export const PopoverEditorLinkLoading: React.FC<Props> = memo<Props>(() => {
  return (
    <Flex alignItems="center" justifyContent="center">
      <Spinner size="sm" color="gray.400" emptyColor="gray.200" />
    </Flex>
  )
})
PopoverEditorLinkLoading.displayName = 'PopoverEditorLinkLoading'
