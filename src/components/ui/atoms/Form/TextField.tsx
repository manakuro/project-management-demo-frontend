import { type FieldInputProps, useField } from 'formik'
import type React from 'react'
import { memo } from 'react'
import { FormControl, FormErrorMessage, Input } from 'src/components/ui/atoms'

type Props = {
  name: string
}

export const TextField: React.FC<Props> = memo((props) => {
  const { name } = props
  const [field, meta] = useField(name)

  return <Component error={meta.error || ''} {...field} name={name} />
})

type ComponentProps = Props &
  FieldInputProps<string> & {
    error: string
  }
const Component: React.FC<ComponentProps> = memo((props) => {
  const { error, ...rest } = props

  console.log('render!: ', props.name)

  return (
    <FormControl isInvalid={!!error}>
      <Input {...rest} fontSize="sm" />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  )
})
Component.displayName = 'Component'
TextField.displayName = 'TextField'
