import { useFormikContext } from 'formik'
import React, { memo } from 'react'
import { Button, ButtonProps } from 'src/components/atoms'

type Props = ButtonProps

export const SubmitButton: React.FC<Props> = memo((props) => {
  const { isValid } = useFormikContext()

  return (
    <Button
      colorScheme="teal"
      size="sm"
      type="submit"
      isDisabled={!isValid}
      {...props}
    />
  )
})

SubmitButton.displayName = 'SubmitButton'
