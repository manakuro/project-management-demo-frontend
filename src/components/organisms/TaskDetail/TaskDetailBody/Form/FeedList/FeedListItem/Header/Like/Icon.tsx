import React from 'react'
import { Flex, Icon as AtomsIcon, Text } from 'src/components/atoms'
import { Tooltip } from 'src/components/molecules'
import { useLike } from './useLike'

type Props = {}

export const Icon: React.VFC<Props> = () => {
  const { hasAnyoneLiked, label, likeLength, onToggleLike } = useLike()

  if (hasAnyoneLiked) {
    return (
      <Tooltip
        hasArrow
        label={label}
        aria-label="The number of likes of this feed"
        size="sm"
        withIcon
      >
        <Flex
          alignItems="center"
          justifyContent="center"
          onClick={onToggleLike}
        >
          <Text fontSize="xs" mt={1} color="primary">
            {likeLength}
          </Text>
          <AtomsIcon icon="fillLike" color="primary" ml={1} />
        </Flex>
      </Tooltip>
    )
  }

  return (
    <AtomsIcon icon="outlineLike" color="text.muted" onClick={onToggleLike} />
  )
}
