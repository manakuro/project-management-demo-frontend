import React, { memo } from 'react'
import { NewButton } from './NewButton'
import { Stack } from 'src/components/atoms'
import { ThumbnailAttachment } from 'src/components/molecules'

type Props = {}

export const Attachment: React.VFC<Props> = memo<Props>(() => {
  return (
    <Stack alignItems="center" direction="row" spacing={4}>
      <ThumbnailAttachment image="/images/cat_img.png" />
      <ThumbnailAttachment image="/images/screen_shot.png" />
      <NewButton />
    </Stack>
  )
})
