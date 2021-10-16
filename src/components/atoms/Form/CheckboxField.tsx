import { useField, FieldInputProps } from 'formik'
import React, { memo } from 'react'
import { Checkbox } from 'src/components/atoms'

type Props = {
  name: string
  value: string
}

export const CheckboxField: React.FC<Props> = memo((props) => {
  const [field] = useField({
    name: props.name,
    type: 'checkbox',
    value: props.value,
  })

  return <Component {...field} {...props} />
})

type ComponentProps = Props & FieldInputProps<string>
const Component: React.FC<ComponentProps> = memo((props) => {
  return <Checkbox size="sm" isChecked={props.checked} {...props} />
})
Component.displayName = 'Component'
CheckboxField.displayName = 'CheckboxField'
