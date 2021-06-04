import React, { memo, useEffect } from 'react'
import { PortalManager } from 'src/components/atoms'
import { Popover, PopoverProps, PopoverTrigger } from 'src/components/organisms'
import { Content } from './Content'
import { useSearchProjectsQuery } from './useSearchProjectsQuery'

type Props = PopoverProps & {
  onSelect: (val: string) => void
  queryText: string
  onClosed?: () => void
}

export const ProjectMenu: React.FC<Props> = memo<Props>((props) => {
  const { onClosed, queryText, ...rest } = props
  const { refetch, projects, loading } = useSearchProjectsQuery()

  useEffect(() => {
    if (queryText) {
      refetch({ queryText })
    }
  }, [queryText, refetch])

  return (
    <PortalManager zIndex={1500}>
      <Popover
        closeOnBlur={false}
        autoFocus={false}
        returnFocusOnClose={false}
        isLazy
        lazyBehavior="keepMounted"
        {...rest}
      >
        <PopoverTrigger>{props.children}</PopoverTrigger>
        <Content
          onClosed={onClosed}
          onClose={props.onClose}
          onSelect={props.onSelect}
          projects={projects}
          loading={loading}
        />
      </Popover>
    </PortalManager>
  )
})
