import React, { memo } from 'react'
import { Flex } from 'src/components/ui/atoms'
import { useDescriptionTitle } from 'src/hooks/pages/projects'
import { Input } from './Input'

type Props = {
  projectId: string
}

export const DescriptionTitle: React.FC<Props> = memo<Props>((props) => {
  const { descriptionTitle, onChange } = useDescriptionTitle(props)

  return (
    <Flex>
      <Input value={descriptionTitle} onChange={onChange} />
    </Flex>
  )
})
DescriptionTitle.displayName = 'DescriptionTitle'
