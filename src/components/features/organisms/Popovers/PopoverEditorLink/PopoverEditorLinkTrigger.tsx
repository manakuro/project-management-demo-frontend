import type React from 'react'
import { Link } from 'src/components/ui/atoms'
import { PopoverTrigger } from 'src/components/ui/organisms/Popover'
import { useLinkStyle } from 'src/hooks/styles'

export const PopoverEditorLinkTrigger: React.FCWithChildren = (props) => {
  const { style } = useLinkStyle()

  return (
    <PopoverTrigger>
      <Link {...style}>{props.children}</Link>
    </PopoverTrigger>
  )
}
