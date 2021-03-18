import React from 'react'
import {
  Menu,
  MenuButton,
  MenuButtonProps,
  MenuList,
} from 'src/components/organisms'
import { Input, InputProps, Portal } from 'src/components/atoms'

type Props = {
  value: string
  onChange: (val: string) => void
  size: InputProps['size']
} & Omit<MenuButtonProps, 'onChange'>

export const Select: React.FC<Props> = (props) => {
  const { value, onChange, children, size, ...rest } = props

  const options = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) {
      console.warn('Provide React element under Select component')
      return null
    }

    return React.cloneElement(child, {
      onChange,
    })
  })

  return (
    <Menu placement="bottom-start" isLazy>
      <MenuButton {...rest}>
        <Input size={size} value={props.value} onChange={() => {}} />
      </MenuButton>
      <Portal>
        <MenuList zIndex="popover" minW={28} maxH={60} overflowY="scroll">
          {options}
        </MenuList>
      </Portal>
    </Menu>
  )
}
