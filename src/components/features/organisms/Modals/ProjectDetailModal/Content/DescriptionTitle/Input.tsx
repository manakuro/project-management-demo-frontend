import type React from 'react'
import { memo } from 'react'
import { Flex, InputText } from 'src/components/ui/atoms'
import { useDescriptionTitleInput } from 'src/hooks/pages/projects'

type Props = {
  value: string
  onChange: (val: string) => void
}

export const Input: React.FC<Props> = memo<Props>((props) => {
  const { value, onKeyDown, onChange } = useDescriptionTitleInput(props)

  return (
    <Flex flex={1}>
      <InputText
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        fontSize="md"
        fontWeight="medium"
        minH="38px"
        placeholder="How we'll collaborate"
        noBorder
      />
    </Flex>
  )
})
Input.displayName = 'Input'
