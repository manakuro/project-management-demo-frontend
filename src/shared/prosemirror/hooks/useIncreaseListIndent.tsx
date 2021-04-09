import { ToolbarItem } from './types'
import { sinkListItemCommand } from 'src/shared/prosemirror/config/commands'
import { useMemo } from 'react'

export const useIncreaseListIndent = (): ToolbarItem => {
  return useMemo(
    () => ({
      action: sinkListItemCommand,
      isEnable: sinkListItemCommand,
    }),
    [],
  )
}
