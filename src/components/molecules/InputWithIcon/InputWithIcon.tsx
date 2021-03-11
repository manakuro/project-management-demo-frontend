import React from 'react'
import {
  Icon,
  IconType,
  InputProps,
  InputGroup,
  Input,
  InputLeftElement,
} from 'src/components/atoms'

type Props = InputProps & {
  icon: IconType
}
export type InputWithIconProps = Props

const iconSizes = {
  lg: {
    w: '1.25em',
    h: '1.25em',
  },
  md: {
    w: '1.25em',
    h: '1.25em',
  },
  sm: {
    w: '1em',
    h: '1em',
  },
  xs: {
    w: '0.875em',
    h: '0.875em',
  },
} as const
type IconSizes = keyof typeof iconSizes

export const InputWithIcon: React.FC<Props> = (props) => {
  const { icon, size, ...inputProps } = props
  const iconSize = iconSizes[(size as IconSizes) ?? 'md']

  return (
    <InputGroup size={size}>
      <InputLeftElement
        pointerEvents="none"
        children={<Icon icon={icon} color="gray.300" {...iconSize} />}
      />
      <Input focusBorderColor="primary" placeholder="Search" {...inputProps} />
    </InputGroup>
  )
}
