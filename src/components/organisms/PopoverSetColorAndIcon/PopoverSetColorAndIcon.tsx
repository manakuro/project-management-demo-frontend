import React from 'react'
import {
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  PopoverProps,
} from 'src/components/organisms'
import { Divider, Link } from 'src/components/atoms'
import { ColorPicker } from './ColorPicker'
import { IconPicker } from './IconPicker'
import { Setting } from './Setting'
import { Project } from 'src/store/projects'

type Props = {
  project: Project
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
    <Popover
      isOpen={props.isOpen}
      isLazy
      placement={props.placement}
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <Link>{props.children}</Link>
      </PopoverTrigger>
      <PopoverContent w={WIDTH} ml="5px" pointerEvents="auto">
        <PopoverBody p={0}>
          <ColorPicker
            currentId={props.project.color.id}
            projectId={props.project.id}
          />
          <Divider />
          <IconPicker
            currentIconId={props.project.icon.id}
            currentColorId={props.project.color.id}
          />
          <Divider />
          <Setting isSetForEveryone />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
