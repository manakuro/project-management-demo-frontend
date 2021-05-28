import React, { useCallback } from 'react'
import { Label, LabelProps } from 'src/components/atoms'
import { isInputFiles } from 'src/shared/isInputFile'

export type UploadedFile = {
  name: string
  type: File['type']
  data: string
}
export type FileUploaderParams = UploadedFile[]

type Props = {
  id: string
  onUpload?: (file: FileUploaderParams) => void
} & LabelProps
export type FileUploaderProps = Props

export const FileUploader: React.FC<Props> = (props) => {
  const { id, ...rest } = props

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isInputFiles(e) || !e.currentTarget.files?.length) return

      const files = e.currentTarget.files
      const uploadedFiles: UploadedFile[] = []
      Array.from(files).forEach((file) => {
        const reader = new FileReader()

        reader.onload = (event) => {
          const data = (event.target?.result || '') as string
          // const base64 = file.replace(/^data:.+;base64,/, '')
          const base64 = data
          uploadedFiles.push({
            data: base64,
            type: file.type,
            name: file.name,
          })
        }
        reader.readAsDataURL(file)
      })

      props.onUpload?.(uploadedFiles)
    },
    [props],
  )

  return (
    <Label {...rest} htmlFor={props.id}>
      {props.children}
      <input
        type="file"
        id={props.id}
        hidden
        onChange={handleChange}
        multiple
      />
    </Label>
  )
}
