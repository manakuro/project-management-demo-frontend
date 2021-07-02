import React, { memo } from 'react'
import { Flex, Icon as AtomsIcon, Text } from 'src/components/atoms'
import { Tooltip } from 'src/components/molecules'
import { LikeButtonProps } from './LikeButton'

type Props = Pick<
  LikeButtonProps,
  'hasAnyoneLiked' | 'label' | 'likeLength' | 'textStyle'
>

export const Icon: React.VFC<Props> = memo<Props>((props) => {
  const { hasAnyoneLiked, label, likeLength, textStyle } = props

  if (hasAnyoneLiked) {
    return (
      <Tooltip
        hasArrow
        label={label}
        aria-label="The number of likes of this feed"
        size="sm"
        withIcon
      >
        <Flex alignItems="center" justifyContent="center">
          <Text fontSize="xs" mt={1} color="primary" {...textStyle}>
            {likeLength}
          </Text>
          <AtomsIcon icon="fillLike" color="primary" ml={1} />
        </Flex>
      </Tooltip>
    )
  }

  return <AtomsIcon icon="outlineLike" color="text.muted" />
})
Icon.displayName = 'Icon'
