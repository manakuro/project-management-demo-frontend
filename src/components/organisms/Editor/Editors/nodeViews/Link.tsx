import { Icon, Link as AtomsLink } from 'src/components/atoms'
import React from 'react'
import { useReactNodeView } from '../ReactNodeView'
import {
  PopoverEditorLink,
  PopoverEditorLinkContent,
  PopoverEditorLinkText,
  PopoverEditorLinkTrigger,
} from 'src/components/organisms'

export const Link: React.FC = (props) => {
  const context = useReactNodeView()
  console.log(context)

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
