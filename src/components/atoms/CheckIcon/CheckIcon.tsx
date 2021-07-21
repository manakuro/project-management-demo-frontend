import React, { useMemo } from 'react'
import { Icon, IconProps } from 'src/components/atoms'
import { transitions } from 'src/styles'

type Props = {
  isDone: boolean
  isTransitioning?: boolean
} & Omit<IconProps, 'icon'>
export type CheckIconProps = Props

export const CheckIcon: React.FC<Props> = (props) => {
  const { isDone, isTransitioning, ...rest } = props
  const iconStyle = useMemo<IconProps>(() => {
    if (isTransitioning)
      return {
        icon: 'checkCircle',
        color: 'teal.100',
        _hover: { color: 'teal.100' },
      }
    if (isDone) return { icon: 'checkCircleFilled', color: 'teal.400' }
    return { icon: 'checkCircle', color: 'gray.500' }
  }, [isDone, isTransitioning])

  return (
    <Icon
      _hover={{ color: 'teal.300' }}
      cursor="pointer"
      transition={transitions.base()}
      {...iconStyle}
      {...rest}
    />
  )
}
