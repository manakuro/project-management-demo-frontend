import type React from 'react'
import {
  PopoverEditorLink,
  PopoverEditorLinkContent,
  PopoverEditorLinkText,
  PopoverEditorLinkTrigger,
} from 'src/components/features/organisms/Popovers'
import { Link as AtomsLink, Icon } from 'src/components/ui/atoms'
import { useReactNodeView } from '../ReactNodeView'

export const Link: React.FCWithChildren = (props) => {
  const context = useReactNodeView()

  return (
    <PopoverEditorLink>
      <PopoverEditorLinkTrigger>{props.children}</PopoverEditorLinkTrigger>
      <PopoverEditorLinkContent>
        <Icon icon="linkExternal" color="text.muted" size="sm" />
        <PopoverEditorLinkText>
          <AtomsLink href={context.node?.attrs.href} isExternal>
            {context.node?.attrs.href}
          </AtomsLink>
        </PopoverEditorLinkText>
      </PopoverEditorLinkContent>
    </PopoverEditorLink>
  )
}
