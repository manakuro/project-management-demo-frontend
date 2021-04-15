import { ToolbarItem } from './types'
// import { schema } from 'src/shared/prosemirror/config'
import { useCallback, useMemo } from 'react'
// import { Command, toggleMark } from 'prosemirror-commands'
import { Command } from 'prosemirror-commands'
import { usePopoverEmoji } from 'src/components/organisms'

export const useEmoji = (): ToolbarItem => {
  const { onOpen } = usePopoverEmoji()
  const action = useCallback<
    (
      state: Parameters<Command>[0],
      dispatch: Parameters<Command>[1],
      view: Parameters<Command>[2],
    ) => Promise<boolean>
  >(
    async (state, dispatch) => {
      console.log('action!')
      onOpen()
      // if (!input.emoji) return false

      // toggleMark(schema.marks.text, {})(state, dispatch)

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
