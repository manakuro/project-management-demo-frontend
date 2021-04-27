import { Link } from 'src/components/atoms'
import React from 'react'
import { PopoverTrigger } from 'src/components/organisms'
import { useLinkStyle } from 'src/hooks/styles'

export const PopoverEditorLinkTrigger: React.FC = (props) => {
  const { style } = useLinkStyle()

  return (
    <PopoverTrigger>
      <Link {...style}>{props.children}</Link>
    </PopoverTrigger>
  )
}
