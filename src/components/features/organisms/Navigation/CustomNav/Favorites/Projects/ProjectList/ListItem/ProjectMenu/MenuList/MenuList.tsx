import React from 'react'
import { Portal } from 'src/components/ui/atoms'
import {
  MenuList as AtomsMenuList,
  MenuItem,
} from 'src/components/ui/organisms/Menu'
import { useClickOutside } from 'src/hooks'
import { RemoveFromFavorites } from './RemoveFromFavorites'

type Props = {
  projectId: string
  onClose: () => void
}

export const MenuList: React.FC<Props> = (props) => {
  const { onClose, projectId } = props
  const { ref } = useClickOutside(() => {
    onClose()
  })

  return (
    <Portal>
      <AtomsMenuList ref={ref}>
        <RemoveFromFavorites onClose={onClose} projectId={projectId} />
        <MenuItem isDisabled>Duplicate Project...</MenuItem>
      </AtomsMenuList>
    </Portal>
  )
}
