import React, { memo } from 'react'
import { Divider, Flex } from 'src/components/atoms'
import { ProjectIcon } from './ProjectIcon'
import { ShareButton } from './ShareButton'
import { SkeletonHeader } from './SkeletonHeader'
import { Tabs } from './Tabs'

type Props = {
  loading?: boolean
}
export const Header: React.VFC<Props> = memo<Props>((props) => {
  if (props.loading) {
    return <SkeletonHeader />
  }

  return (
    <Flex flex={1}>
      <ProjectIcon />
      <Tabs />
      <ShareButton />
      <Flex mx={3} my={4}>
        <Divider orientation="vertical" />
      </Flex>
    </Flex>
  )
})
Header.displayName = 'Header'
