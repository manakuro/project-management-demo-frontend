import React from 'react'
import { MenuList as AtomsMenuList } from 'src/components/organisms/Menu'
import { Portal } from 'src/components/ui/atoms'
import { useClickOutside } from 'src/hooks'
import { RemoveFromFavorites } from './RemoveFromFavorites'

type Props = {
  workspaceId: string
  onClose: () => void
}

export const MenuList: React.FC<Props> = (props) => {
  const { onClose, workspaceId } = props
  const { ref } = useClickOutside(onClose)

  return (
    <Portal>
      <AtomsMenuList ref={ref}>
        <RemoveFromFavorites onClose={onClose} workspaceId={workspaceId} />
      </AtomsMenuList>
    </Portal>
  )
}
