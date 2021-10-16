import { useField, FieldInputProps } from 'formik'
import React, { memo } from 'react'
import { FormErrorMessage, Input, FormControl } from 'src/components/atoms'

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
