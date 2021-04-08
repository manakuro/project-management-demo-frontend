import React, { memo } from 'react'
import {
  isMarkActive,
  toggleMarkCommand,
} from 'src/components/organisms/Editor/utils'
import { schema } from 'prosemirror-schema-basic'
import { EditorState } from 'prosemirror-state'
import { BaseButton } from '../BaseButton'

type Props = {
  state: EditorState<any>
  setState: React.Dispatch<React.SetStateAction<EditorState<any>>>
}

export const toggleItalic = toggleMarkCommand(schema.marks.em)
const isItalic = (state: EditorState): boolean =>
  isMarkActive(state, schema.marks.em)

export const Italic: React.FC<Props> = memo<Props>((props) => {
  return (
    <BaseButton
      isActive={isItalic(props.state)}
      onClick={() =>
        toggleItalic(props.state, (tr) => props.setState(props.state.apply(tr)))
      }
    >
      I
    </BaseButton>
  )
})
