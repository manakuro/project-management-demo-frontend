import React from 'react'
import { PopoverTrigger } from 'src/components/organisms/Popover'
import { Link } from 'src/components/ui/atoms'
import { useLinkStyle } from 'src/hooks/styles'

export const PopoverEditorLinkTrigger: React.FCWithChildren = (props) => {
  const { style } = useLinkStyle()

  return (
    <PopoverTrigger>
      <Link {...style}>{props.children}</Link>
    </PopoverTrigger>
  )
}
