import React from 'react'
import { Avatar } from 'src/components/atoms'

export const MyAccountAvatar: React.FC = (props) => {
  return (
    <Avatar
      name="Manato Kuroda"
      src="/images/cat_img.png"
      size="sm"
      cursor="pointer"
      bg="teal.200"
    />
  )
}
