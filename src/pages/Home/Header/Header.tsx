import React, { memo } from 'react'
import { Heading } from 'src/components/atoms'
import { MainHeader } from 'src/components/organisms/MainHeader'
import { useTasksListContentVerticalScroll } from '../Content'

type Props = {}

export const Header: React.VFC<Props> = memo<Props>(() => {
  const { isScrolling } = useTasksListContentVerticalScroll()

  return (
    <MainHeader sticky isScrolling={isScrolling}>
      <Heading as="h2" size="md" fontWeight="semibold">
        Home
      </Heading>
    </MainHeader>
  )
})
Header.displayName = 'Header'
