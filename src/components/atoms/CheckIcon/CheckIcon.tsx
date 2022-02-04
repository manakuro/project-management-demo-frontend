import React, { useMemo } from 'react'
import { Icon, IconProps } from 'src/components/atoms'
import { transitions } from 'src/styles'

type Props = {
  completed: boolean
  isTransitioning?: boolean
} & Omit<IconProps, 'icon'>
export type CheckIconProps = Props

export const CheckIcon: React.FC<Props> = (props) => {
  const { completed, isTransitioning, color, ...rest } = props
  const iconStyle = useMemo<IconProps>(() => {
    if (isTransitioning)
      return {
        icon: 'checkCircle',
        color: 'teal.100',
        _hover: { color: 'teal.100' },
      }
    if (completed)
      return { icon: 'checkCircleFilled', color: 'teal.400', opacity: 0.6 }
    return { icon: 'checkCircle', color: color ?? 'gray.500' }
  }, [completed, isTransitioning, color])

  return (
    <Icon
      _hover={{ color: 'teal.300' }}
      cursor="pointer"
      transition={transitions.base()}
      {...rest}
      {...iconStyle}
    />
  )
}
