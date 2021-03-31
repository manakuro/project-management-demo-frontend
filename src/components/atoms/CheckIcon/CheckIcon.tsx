import React from 'react'
import { Icon, IconProps } from 'src/components/atoms'
import { transitions } from 'src/styles'

type Props = {
  isDone: boolean
} & Omit<IconProps, 'icon'>
export type CheckIconProps = Props

export const CheckIcon: React.FC<Props> = (props) => {
  const { isDone, ...rest } = props
  const iconStyle: IconProps = isDone
    ? { icon: 'checkCircleFilled', color: 'teal.400' }
    : { icon: 'checkCircle', color: 'gray.500' }

  return (
    <Icon
      {...iconStyle}
      _hover={{ color: 'teal.300' }}
      cursor="pointer"
      transition={transitions.base}
      {...rest}
    />
  )
}
