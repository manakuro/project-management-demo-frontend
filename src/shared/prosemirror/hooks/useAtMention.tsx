import { ToolbarItem } from './types'
import { useCallback, useMemo } from 'react'
import { Command } from 'prosemirror-commands'
import { useEditorLinkModal } from 'src/components/organisms'

export const useAtMention = (): ToolbarItem => {
  const { onOpen } = useEditorLinkModal()
  const action = useCallback<
    (
      state: Parameters<Command>[0],
      dispatch: Parameters<Command>[1],
      view: Parameters<Command>[2],
    ) => Promise<boolean>
  >(
    async (state, dispatch) => {
      console.log('state: ', state)
      const selectedText = window.getSelection()
      const position = selectedText?.getRangeAt(0).getBoundingClientRect()

      if (!selectedText?.anchorNode) return false

      const input = await onOpen({
        x: Number(position?.top),
        y: Number(position?.left),
      })
      if (!input.url) return false

      return true
    },
    [onOpen],
  )

  return useMemo(
    () => ({
      action,
    }),
    [action],
  )
}
