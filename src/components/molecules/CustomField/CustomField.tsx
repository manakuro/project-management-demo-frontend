import React from 'react'
import {
  FormLabel,
  FormControl,
  Switch,
  FormControlProps,
  Flex,
  Icon,
} from 'src/components/atoms'
import { useClickableHoverStyle } from 'src/hooks'

type Props = FormControlProps & {
  label: string
}
export type CustomFieldProps = Props

export const CustomField: React.FC<Props> = (props) => {
  const { clickableHoverInputGrabbableStyle } = useClickableHoverStyle()

  return (
    <FormControl>
      <Flex
        alignItems="center"
        px={1}
        py={2}
        border="1px"
        borderRadius="md"
        borderColor="gray.200"
        boxShadow="md"
        {...clickableHoverInputGrabbableStyle}
        cursor="grab"
      >
        <Icon icon="gridVertical" color="text.muted" size="sm" />
        <FormLabel cursor="grab" ml={2} mb="0" flex={1} fontSize="sm">
          {props.label}
        </FormLabel>
        <Switch colorScheme="teal" size="sm" />
      </Flex>
    </FormControl>
  )
}
