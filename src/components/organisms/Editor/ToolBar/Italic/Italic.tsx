import React, { memo, useCallback } from 'react'
import {
  isMarkActive,
  toggleMarkCommand,
} from 'src/components/organisms/Editor/utils'
import { schema } from 'src/components/organisms/Editor/schema'
import { EditorState } from 'prosemirror-state'
import { BaseButton } from '../BaseButton'
import { Icon } from 'src/components/atoms'

type Props = {
  state: EditorState<any>
  setState: React.Dispatch<React.SetStateAction<EditorState<any>>>
}

export const toggleItalic = toggleMarkCommand(schema.marks.em)
const isItalic = (state: EditorState): boolean =>
  isMarkActive(state, schema.marks.em)

export const Italic: React.FC<Props> = memo<Props>((props) => {
  const handleClick = useCallback(() => {
    toggleItalic(props.state, (tr) => props.setState(props.state.apply(tr)))
  }, [props])

  return (
    <BaseButton
      aria-label="bold"
      icon={<Icon icon="italic" color="text.muted" />}
      isActive={isItalic(props.state)}
      onClick={handleClick}
      tooltip={{
        label: 'Italic\n(⌘+i)',
        'aria-label': 'Italic',
      }}
    />
  )
})
