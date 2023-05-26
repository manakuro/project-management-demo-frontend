import React, { memo } from 'react'
import { Divider, Flex } from 'src/components/ui/atoms'
import { InviteButton } from './InviteButton'
import { SkeletonHeader } from './SkeletonHeader'
import { Tabs } from './Tabs'
import { WorkspaceTeammates } from './WorkspaceTeammates'

type Props = {
  loading?: boolean
}
export const Header: React.FC<Props> = memo<Props>((props) => {
  if (props.loading) {
    return <SkeletonHeader />
  }

  return (
    <Flex flex={1}>
      <Tabs />
      <WorkspaceTeammates />
      <InviteButton ml={2} />
      <Flex mx={3} my={4}>
        <Divider orientation="vertical" />
      </Flex>
    </Flex>
  )
})
Header.displayName = 'Header'
