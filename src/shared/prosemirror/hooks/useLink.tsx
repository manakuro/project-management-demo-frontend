import { ToolbarItem } from './types'
import { isMarkActive } from 'src/shared/prosemirror/commands'
import { schema } from 'src/shared/prosemirror/config'
import { useCallback, useMemo } from 'react'
import { Command, toggleMark } from 'prosemirror-commands'
import { useEditorLinkModal } from 'src/components/organisms'

export const useLink = (): ToolbarItem => {
  const { onOpen } = useEditorLinkModal()
  const action = useCallback<Command>(
    (state, dispatch, view) => {
      if (isMarkActive(schema.marks.link)(state)) {
        toggleMark(schema.marks.link)(state, dispatch)
        return true
      }
      const selectedText = window.getSelection()
      const position = selectedText?.getRangeAt(0).getBoundingClientRect()
      console.log(position)
      onOpen({ x: position?.x, y: position?.y })

      toggleMark(schema.marks.link, { href: '' })(state, dispatch)

      return true
    },
    [onOpen],
  )

  return useMemo(
    () => ({
      action,
      isActive: isMarkActive(schema.marks.link),
      isEnable: (state) => !state.selection.empty,
    }),
    [action],
  )
}
