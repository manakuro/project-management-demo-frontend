import React, { memo } from 'react'
import { Flex, FlexProps, Skeleton, Stack } from 'src/components/ui/atoms'
import { useBreakpointValue } from 'src/shared/chakra'

type Props = FlexProps

export const SkeletonFiles: React.FC<Props> = memo<Props>(() => {
  const splitNum = useBreakpointValue({ base: 2, '2xl': 3 }) as number

  return (
    <Flex flex={1} h="full" flexDirection="column" bg="gray.50">
      <Flex flex={1} p={8} pb={0}>
        <Stack maxW="90%" mx="auto" direction="row" spacing={8}>
          {[...new Array(splitNum)].map((_, i) => (
            <Stack spacing={8} key={i}>
              <Flex flexDirection="column" w="420px" key={i}>
                <Stack spacing={8}>
                  <Skeleton h="120px" w="full" borderRadius="md" />
                  <Skeleton h="71px" w="full" borderRadius="md" />
                </Stack>
              </Flex>
            </Stack>
          ))}
        </Stack>
      </Flex>
    </Flex>
  )
})
SkeletonFiles.displayName = 'SkeletonFiles'
