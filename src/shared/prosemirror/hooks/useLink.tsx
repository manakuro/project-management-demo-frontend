import { ToolbarItem } from './types'
import { isMarkActive } from 'src/shared/prosemirror/commands'
import { schema } from 'src/shared/prosemirror/config'
import { useCallback, useMemo } from 'react'
import { Command, toggleMark } from 'prosemirror-commands'
import { useEditorLinkModal } from 'src/components/organisms'

export const useLink = (): ToolbarItem => {
  const { onOpen } = useEditorLinkModal()
  const action = useCallback<
    (
      state: Parameters<Command>[0],
      dispatch: Parameters<Command>[1],
      view: Parameters<Command>[2],
    ) => Promise<boolean>
  >(
    async (state, dispatch) => {
      if (isMarkActive(schema.marks.link)(state)) {
        toggleMark(schema.marks.link)(state, dispatch)
        return true
      }
      const selectedText = window.getSelection()
      const position = selectedText?.getRangeAt(0).getBoundingClientRect()
      const input = await onOpen({
        x: Number(position?.top),
        y: Number(position?.left),
        text: selectedText?.anchorNode?.textContent || '',
      })
      if (!input.url) return false

      toggleMark(schema.marks.link, { href: input.url })(state, dispatch)

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
