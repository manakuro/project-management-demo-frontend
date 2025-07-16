import type React from 'react'
import { memo } from 'react'
import { Divider, Flex } from 'src/components/ui/atoms'
import { ProjectIcon } from './ProjectIcon'
import { ProjectTeammates } from './ProjectTeammates'
import { ShareButton } from './ShareButton'
import { SkeletonHeader } from './SkeletonHeader'
import { Tabs } from './Tabs'

type Props = {
  loading?: boolean
}
export const Header: React.FC<Props> = memo<Props>((props) => {
  if (props.loading) {
    return <SkeletonHeader />
  }

  return (
    <Flex flex={1}>
      <ProjectIcon />
      <Tabs />
      <ProjectTeammates />
      <ShareButton ml={2} />
      <Flex mx={3} my={4}>
        <Divider orientation="vertical" />
      </Flex>
    </Flex>
  )
})
Header.displayName = 'Header'
