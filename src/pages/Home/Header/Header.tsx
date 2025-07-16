import { memo } from 'react'
import { MainHeader } from 'src/components/features/organisms/MainHeader'
import { Heading } from 'src/components/ui/atoms'
import { useTasksListContentVerticalScroll } from '../Content'

export const Header = memo(function Header() {
  const { isScrolling } = useTasksListContentVerticalScroll()

  return (
    <MainHeader sticky isScrolling={isScrolling}>
      <Heading as="h2" size="md" fontWeight="semibold">
        Home
      </Heading>
    </MainHeader>
  )
})
