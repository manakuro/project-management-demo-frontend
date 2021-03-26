import React, { memo } from 'react'
import { Avatar as AtomsAvatar, Flex } from 'src/components/atoms'

export const Avatar: React.VFC = memo(() => {
  return (
    <Flex alignItems="center">
      <AtomsAvatar name="Manato Kuroda" src="/images/cat_img.png" />
    </Flex>
  )
})
