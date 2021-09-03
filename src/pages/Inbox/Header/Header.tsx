import React, { memo } from 'react'
import { Flex } from 'src/components/atoms'
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
      <Tabs />
    </Flex>
  )
})
Header.displayName = 'Header'
