import React, { memo, useCallback } from 'react'
import { isMarkActive, toggleMarkCommand } from 'src/shared/prosemirror/utils'
import { schema } from 'src/shared/prosemirror/schema'
import { EditorState } from 'prosemirror-state'
import { BaseButton } from '../BaseButton'
import { Icon } from 'src/components/atoms'

type Props = {
  state: EditorState<any>
  setState: React.Dispatch<React.SetStateAction<EditorState<any>>>
}

export const toggleStrikeThrough = toggleMarkCommand(schema.marks.strikethrough)
const isStrikeThrough = (state: EditorState): boolean =>
  isMarkActive(state, schema.marks.strikethrough)

export const Strikethrough: React.FC<Props> = memo<Props>((props) => {
  const handleClick = useCallback(() => {
    toggleStrikeThrough(props.state, (tr) =>
      props.setState(props.state.apply(tr)),
    )
  }, [props])

  return (
    <BaseButton
      aria-label="strikethrough"
      icon={<Icon icon="strikethrough" color="text.muted" />}
      isActive={isStrikeThrough(props.state)}
      onClick={handleClick}
      tooltip={{
        label: 'Strikethrough\n(⌘+⇧+S)',
        'aria-label': 'Strikethrough',
      }}
    />
  )
})
