import React, { useCallback } from 'react'
import { Label, LabelProps } from 'src/components/atoms'
import { isInputFiles } from 'src/shared/isInputFile'

type Props = {
  id: string
  onUpload?: (base64: string) => void
} & LabelProps
export type FileUploaderProps = Props

export const FileUploader: React.FC<Props> = (props) => {
  const { id, ...rest } = props

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isInputFiles(e) || !e.currentTarget.files?.length) return

      const file = e.currentTarget.files[0]
      const reader = new FileReader()

      reader.onload = (event) => {
        const file = (event.target?.result || '') as string
        const base64 = file.replace(/^data:.+;base64,/, '')
        props.onUpload?.(base64)
      }
      reader.readAsDataURL(file)
    },
    [props],
  )

  return (
    <Label {...rest} htmlFor={props.id}>
      {props.children}
      <input type="file" id={props.id} hidden onChange={handleChange} />
    </Label>
  )
}
