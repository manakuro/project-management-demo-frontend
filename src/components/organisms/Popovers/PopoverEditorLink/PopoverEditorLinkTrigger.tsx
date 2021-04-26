import { Link as AtomsLink } from 'src/components/atoms'
import React from 'react'
import { PopoverTrigger } from 'src/components/organisms'
import { MentionText } from 'src/components/organisms/Editor/Editors/nodeViews/Mention/MentionText'

export const PopoverEditorLinkTrigger: React.FC = (props) => {
  return (
    <PopoverTrigger>
      <AtomsLink>
        <MentionText>{props.children}</MentionText>
      </AtomsLink>
    </PopoverTrigger>
  )
}
