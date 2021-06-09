import { useMemo } from 'react'
import { sinkListItemCommand } from 'src/shared/prosemirror/config/commands'
import { ToolbarItem } from './types'

export const useIncreaseListIndent = (): ToolbarItem => {
  return useMemo(
    () => ({
      action: sinkListItemCommand,
      isEnable: sinkListItemCommand,
    }),
    [],
  )
}
