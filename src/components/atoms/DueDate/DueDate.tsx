import React, { useMemo } from 'react'
import { TextProps, Text } from 'src/components/atoms'
import { formatDueDate } from 'src/shared/date'
import { dateFns } from 'src/shared/dateFns'

type Props = TextProps & {
  dueDate: string
  fallback?: string
}

export const DueDate: React.FC<Props> = (props) => {
  const { dueDate, fallback, ...rest } = props
  const isBeforeDate = useMemo(
    () => dateFns.isBeforeDay(new Date(dueDate), new Date()),
    [dueDate],
  )
  const hadDueDate = useMemo(() => !!dueDate, [dueDate])

  const style = useMemo<TextProps>(() => {
    return {
      ...(isBeforeDate
        ? {
            color: 'alert',
          }
        : {}),
    }
  }, [isBeforeDate])

  return (
    <Text color="text.muted" {...style} {...rest}>
      {hadDueDate ? formatDueDate(dueDate) : fallback}
      {rest.children}
    </Text>
  )
}
