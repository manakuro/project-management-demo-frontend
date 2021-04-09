import React, { memo, useCallback } from 'react'
import { isBlockActive } from 'src/shared/prosemirror/utils'
import { schema } from 'src/shared/prosemirror/schema'
import { EditorState } from 'prosemirror-state'
import { BaseButton } from '../BaseButton'
import { Icon } from 'src/components/atoms'
import { setListTypeOrWrapInList } from 'src/components/organisms/Editor/commands'

type Props = {
  state: EditorState<any>
  setState: React.Dispatch<React.SetStateAction<EditorState<any>>>
}

export const toggleBulletedList = setListTypeOrWrapInList(schema.nodes.list, {
  type: 'bullet',
})
const isBulletedList = (state: EditorState): boolean =>
  isBlockActive(state, schema.nodes.list, { type: 'bullet' })

export const BulletedList: React.FC<Props> = memo<Props>((props) => {
  const handleClick = useCallback(() => {
    toggleBulletedList(props.state, (tr) =>
      props.setState(props.state.apply(tr)),
    )
  }, [props])

  return (
    <BaseButton
      aria-label="underline"
      icon={<Icon icon="listUl" color="text.muted" />}
      isActive={isBulletedList(props.state)}
      onClick={handleClick}
      tooltip={{
        label: 'BulletedList\n(⌘+⇧+8)',
        'aria-label': 'BulletedList',
      }}
    />
  )
})
