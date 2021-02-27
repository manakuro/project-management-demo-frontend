import React from 'react'
import {
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  PopoverProps,
} from 'src/components/organisms'
import { Divider, Portal, Link } from 'src/components/atoms'
import { ColorPicker } from 'src/components/organisms/PopoverSetColorAndIcon/ColorPicker'

type Props = {
  project: {
    color: {
      id: number
      name: string
      color: string
    }
    icon: {
      id: number
      name: string
    }
  }
} & PopoverProps

const COLOR_BOX_WIDTH = 20
const COLOR_BOX_PADDING = 4
const COLOR_BOX_PER_COLUMN = 8
const WIDTH = `${
  COLOR_BOX_WIDTH * COLOR_BOX_PER_COLUMN +
  COLOR_BOX_PADDING * COLOR_BOX_PER_COLUMN -
  1 +
  24 * 2
}px`
export const PopoverSetColorAndIcon: React.FC<Props> = (props) => {
  return (
    <Popover isOpen={props.isOpen} isLazy placement={props.placement}>
      <PopoverTrigger>
        <Link>{props.children}</Link>
      </PopoverTrigger>
      <Portal>
        <PopoverContent w={WIDTH} ml="5px">
          <PopoverBody p={0}>
            <ColorPicker currentId={props.project.color.id} />
            <Divider />
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  )
}
