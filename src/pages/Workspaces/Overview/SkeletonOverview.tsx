import React, { memo } from 'react'
import { Flex, FlexProps, Grid, Skeleton } from 'src/components/atoms'
import { OverviewLeft } from './OverviewLeft'
import { OverviewLeftContent } from './OverviewLeftContent'
import { OverviewRight } from './OverviewRight'
import { OverviewRightContent } from './OverviewRightContent'
import {
  OverviewSectionHeader,
  OverviewSectionHeaderHeading,
} from './OverviewSectionHeader'

type Props = FlexProps

const TEXT_HEIGHT = '16px'
const CARD_HEIGHT = '97px'
export const SkeletonOverview: React.VFC<Props> = memo<Props>((props) => {
  return (
    <Flex flex={1} h="full" maxW="full" justifyContent="center" {...props}>
      <OverviewLeft mt={12}>
        <OverviewLeftContent>
          <Flex flexDirection="column">
            <OverviewSectionHeader>
              <OverviewSectionHeaderHeading>
                <Skeleton h={TEXT_HEIGHT} w="100px" borderRadius="full" />
              </OverviewSectionHeaderHeading>
            </OverviewSectionHeader>
            <Flex mt={2} py={1} px={1} mr={-1} ml={-1}>
              <Skeleton h={CARD_HEIGHT} w="full" borderRadius="md" />
            </Flex>
          </Flex>
          <Flex flexDirection="column" mt={8}>
            <OverviewSectionHeader>
              <OverviewSectionHeaderHeading>
                <Skeleton h={TEXT_HEIGHT} w="100px" borderRadius="full" />
              </OverviewSectionHeaderHeading>
            </OverviewSectionHeader>
            <Flex flexDirection="column">
              {[...new Array(4)].map((_, i) => (
                <Flex flex={1} py={3} alignItems="center" key={i}>
                  <Skeleton w="32px" h="32px" borderRadius="full" />
                  <Skeleton h={TEXT_HEIGHT} flex={1} ml={2} borderRadius="md" />
                </Flex>
              ))}
            </Flex>
          </Flex>
        </OverviewLeftContent>
      </OverviewLeft>
      <OverviewRight mt={12} pl={8}>
        <OverviewRightContent>
          <Flex flexDirection="column">
            <OverviewSectionHeader>
              <OverviewSectionHeaderHeading>
                <Skeleton h={TEXT_HEIGHT} w="100px" borderRadius="full" />
              </OverviewSectionHeaderHeading>
            </OverviewSectionHeader>
            <Flex flexDirection="column">
              <Flex py={4}>
                <Grid templateColumns="repeat(4, auto)" gap={6} w="full">
                  {[...new Array(4)].map((_, i) => (
                    <Skeleton h="226px" borderRadius="md" key={i} />
                  ))}
                </Grid>
              </Flex>
            </Flex>
          </Flex>
        </OverviewRightContent>
      </OverviewRight>
    </Flex>
  )
})
SkeletonOverview.displayName = 'SkeletonList'