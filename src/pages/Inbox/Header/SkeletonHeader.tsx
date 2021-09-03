import React, { memo } from 'react'
import { Flex, Stack, Skeleton } from 'src/components/atoms'

export const SkeletonHeader: React.VFC = memo(() => {
  return (
    <Flex flex={1}>
      <Flex mt={3} flex={1}>
        <Flex alignItems="flex-start" flexDirection="column" pt={1}>
          <Flex alignItems="center">
            <Skeleton w="100px" h="16px" borderRadius="full" />
          </Flex>
          <Stack direction="row" spacing={2} mt={3}>
            <Skeleton w="53px" h="16px" borderRadius="full" />
            <Skeleton w="53px" h="16px" borderRadius="full" />
          </Stack>
        </Flex>
      </Flex>
    </Flex>
  )
})
SkeletonHeader.displayName = 'SkeletonHeader'
