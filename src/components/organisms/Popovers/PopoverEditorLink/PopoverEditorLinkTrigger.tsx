import React from 'react'
import { Link } from 'src/components/atoms'
import { PopoverTrigger } from 'src/components/organisms/Popover'
import { useLinkStyle } from 'src/hooks/styles'

export const PopoverEditorLinkTrigger: React.FCWithChildren = (props) => {
  const { style } = useLinkStyle()

  return (
    <PopoverTrigger>
      <Link {...style}>{props.children}</Link>
    </PopoverTrigger>
  )
}
