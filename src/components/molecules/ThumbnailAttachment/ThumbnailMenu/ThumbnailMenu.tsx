import React, { memo } from 'react'
import { Link, Portal } from 'src/components/atoms'
import {
  Menu as OrganismsMenu,
  MenuProps,
  MenuItem,
  MenuList,
} from 'src/components/organisms'

type Props = MenuProps & {
  src: string
}

export const ThumbnailMenu: React.FC<Props> = memo((props) => {
  const { src, ...rest } = props

  return (
    <OrganismsMenu isLazy {...rest}>
      {props.children}
      <Portal>
        <MenuList>
          <MenuItem>
            <Link href={src} download>
              Download attachment
            </Link>
          </MenuItem>
          <MenuItem color="alert">Delete attachment</MenuItem>
        </MenuList>
      </Portal>
    </OrganismsMenu>
  )
})
