import React, { memo } from 'react'
import { FlexProps } from 'src/components/atoms'
import { SearchMenuLeftContainer } from 'src/components/organisms/Menus/SearchMenu'

type Props = FlexProps

export const ProjectTeammateMenuLeftContainer: React.FC<Props> = memo<Props>(
  (props) => {
    return <SearchMenuLeftContainer {...props} />
  },
)
ProjectTeammateMenuLeftContainer.displayName =
  'ProjectTeammateMenuLeftContainer'
