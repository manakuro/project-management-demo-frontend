import { ToolbarItem } from './types'
import { toggleLink } from 'src/shared/prosemirror/config/commands'
import { isMarkActive } from 'src/shared/prosemirror/commands'
import { schema } from 'src/shared/prosemirror/config'
import { useMemo } from 'react'

export const useLink = (): ToolbarItem => {
  return useMemo(
    () => ({
      action: toggleLink,
      isActive: isMarkActive(schema.marks.link),
      isEnable: (state) => !state.selection.empty,
    }),
    [],
  )
}
