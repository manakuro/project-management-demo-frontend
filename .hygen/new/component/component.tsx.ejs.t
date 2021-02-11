---
to: <%= absPath %>/<%= component_name %>.tsx
---
import React from 'react'
import styledSystem, { StyledSystemProps } from 'src/utils/styledSystem'
import styled from 'styled-components'

type Props = StyledSystemProps

export const <%= component_name %>: React.FC<Props> = (props) => {
  return <Container {...props} />
}

const Container = styledSystem(styled.div``)

