import React from 'react'
import {
  MentionText,
  MentionTextProps,
} from 'src/components/ui/organisms/Editor/Editors/nodeViews/Mention/MentionText'

type Props = MentionTextProps

export const PopoverEditorLinkText: React.FC<Props> = (props) => {
  return <MentionText fontSize="sm" ml={3} flex={1} {...props} />
}
