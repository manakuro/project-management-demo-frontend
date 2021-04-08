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

export const toggleBold = toggleMarkCommand(schema.marks.strong)
const isBold = (state: EditorState): boolean =>
  isMarkActive(state, schema.marks.strong)

export const Bold: React.FC<Props> = memo<Props>((props) => {
  return (
    <BaseButton
      isActive={isBold(props.state)}
      onClick={() =>
        toggleBold(props.state, (tr) => props.setState(props.state.apply(tr)))
      }
    >
      B
    </BaseButton>
  )
})
