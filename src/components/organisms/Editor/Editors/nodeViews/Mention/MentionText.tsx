import React from 'react'
import { Text, TextProps } from 'src/components/ui/atoms'
import { useLinkStyle } from 'src/hooks/styles'

type Props = TextProps
export type MentionTextProps = Props

export const MentionText: React.FC<Props> = (props) => {
  const { style } = useLinkStyle()
  return <Text as="span" {...style} {...props} />
}
