import { ToolbarItem } from './types'
import { setListTypeBullet } from 'src/shared/prosemirror/config/commands'
import { isBlockActive } from 'src/shared/prosemirror/commands'
import { schema } from 'src/shared/prosemirror/config'
import { useMemo } from 'react'

export const useBulletList = (): ToolbarItem => {
  return useMemo(
    () => ({
      action: setListTypeBullet,
      isActive: isBlockActive(schema.nodes.list, { type: 'bullet' }),
    }),
    [],
  )
}
