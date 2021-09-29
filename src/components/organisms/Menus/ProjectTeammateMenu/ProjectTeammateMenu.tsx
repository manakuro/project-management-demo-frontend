import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { PortalManager } from 'src/components/atoms'
import {
  Popover,
  PopoverContentProps,
  PopoverProps,
  PopoverTrigger,
} from 'src/components/organisms/Popover'
import { useDebounce } from 'src/hooks'
import { Teammate } from 'src/store/entities/teammates'
import { Content } from './Content'
import { useSearchProjectTeammatesQuery } from './useSearchProjectTeammatesQuery'

type Props = PopoverProps & {
  onSelect: (val: Teammate) => void
  queryText: string
  onClosed?: () => void
  contentStyle?: PopoverContentProps
  initialTeammates?: Teammate[]
}

export const ProjectTeammateMenu: React.FC<Props> = memo<Props>((props) => {
  const { onClosed, queryText, contentStyle, initialTeammates, ...rest } = props
  const {
    refetch,
    teammates,
    loading: loadingQuery,
  } = useSearchProjectTeammatesQuery()
  const [loadingText, setLoadingText] = useState<boolean>(false)
  const loading = useMemo(
    () => loadingText || loadingQuery,
    [loadingQuery, loadingText],
  )
  const [value, setValue] = useState<string>('')

  useEffect(() => {
    setLoadingText(true)
    setValue(queryText)
  }, [queryText])

  const handleDebounce = useCallback(
    async (val: string) => {
      if (!val) return
      console.log(val)
      await refetch({ queryText: val })
      setLoadingText(false)
    },
    [refetch],
  )

  useDebounce(value, handleDebounce, 500)

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
          teammates={teammates}
          loading={loading}
          queryText={value}
          contentStyle={contentStyle}
        />
      </Popover>
    </PortalManager>
  )
})
ProjectTeammateMenu.displayName = 'ProjectTeammateMenu'
