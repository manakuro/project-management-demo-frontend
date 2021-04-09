import React, { memo, useCallback } from 'react'
import { isMarkActive, toggleMarkCommand } from 'src/shared/prosemirror/utils'
import { schema } from 'src/shared/prosemirror/config'
import { EditorState } from 'prosemirror-state'
import { BaseButton } from '../BaseButton'
import { Icon } from 'src/components/atoms'

type Props = {
  state: EditorState<any>
  setState: React.Dispatch<React.SetStateAction<EditorState<any>>>
}

export const toggleUnderline = toggleMarkCommand(schema.marks.underline)
const isUnderline = (state: EditorState): boolean =>
  isMarkActive(state, schema.marks.underline)

export const Underline: React.FC<Props> = memo<Props>((props) => {
  const handleClick = useCallback(() => {
    toggleUnderline(props.state, (tr) => props.setState(props.state.apply(tr)))
  }, [props])

  return (
    <BaseButton
      aria-label="underline"
      icon={<Icon icon="underline" color="text.muted" />}
      isActive={isUnderline(props.state)}
      onClick={handleClick}
      tooltip={{
        label: 'Underline\n(⌘+u)',
        'aria-label': 'Underline',
      }}
    />
  )
})
