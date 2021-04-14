import { Link as AtomsLink } from 'src/components/atoms'
import React from 'react'
import { useReactNodeView } from '../ReactNodeView'

export const Link: React.FC = (props) => {
  const context = useReactNodeView()
  console.log(context)

  return (
    <AtomsLink
      {...context.node?.attrs}
      color="cyan.400"
      cursor="pointer"
      _hover={{
        textDecoration: 'underline !important',
      }}
    >
      {props.children}
    </AtomsLink>
  )
}
