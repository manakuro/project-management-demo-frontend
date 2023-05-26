import React from 'react'
import { FlexProps } from 'src/components/ui/atoms'
import {
  useTaskFile,
  getTaskFileIcon,
  getTaskFileName,
} from 'src/store/entities/taskFile'
import { Component } from './Component'
import { Sizes } from './sizes'

type Props = FlexProps & {
  size: Sizes
  taskFileId: string
  isHovering?: boolean
}

export const AttachmentBox: React.FC<Props> = (props) => {
  const { size, color, taskFileId, isHovering, ...rest } = props
  const { taskFile } = useTaskFile(taskFileId)
  const icon = getTaskFileIcon(taskFile.fileType.typeCode)
  const taskFileName = getTaskFileName(taskFile.fileType.typeCode)

  return (
    <Component
      size={size}
      color={color}
      name={taskFile.name}
      fileName={taskFileName}
      icon={icon}
      src={taskFile.src}
      {...rest}
    />
  )
}
