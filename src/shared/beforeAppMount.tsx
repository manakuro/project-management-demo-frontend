import React from 'react'
import { useProjectsQuery } from 'src/hooks/queries'

export const BeforeAppMount: React.FC = (props) => {
  useProjectsQuery()

  return props.children as React.ReactElement
}
