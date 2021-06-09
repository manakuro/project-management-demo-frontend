import React from 'react'
import { Icon, Link as AtomsLink } from 'src/components/atoms'
import {
  PopoverEditorLink,
  PopoverEditorLinkContent,
  PopoverEditorLinkText,
  PopoverEditorLinkTrigger,
} from 'src/components/organisms'
import { useReactNodeView } from '../ReactNodeView'

export const Link: React.FC = (props) => {
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
