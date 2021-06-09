import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { PortalManager } from 'src/components/atoms'
import { Popover, PopoverProps, PopoverTrigger } from 'src/components/organisms'
import { useDebounce } from 'src/hooks'
import { Content } from './Content'
import { useSearchTagsQuery } from './useSearchTagsQuery'

type Props = PopoverProps & {
  onSelect: (val: string) => void
  queryText: string
  onClosed?: () => void
}

export const TagMenu: React.FC<Props> = memo<Props>((props) => {
  const { onClosed, queryText, ...rest } = props
  const { refetch, tags, loading: loadingQuery } = useSearchTagsQuery()
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
          tags={tags}
          loading={loading}
          queryText={value}
        />
      </Popover>
    </PortalManager>
  )
})
