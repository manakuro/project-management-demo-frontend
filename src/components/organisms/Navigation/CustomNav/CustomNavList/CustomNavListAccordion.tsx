import React from 'react'
import { Accordion } from 'src/components/organisms/Accordion'

type Props = {}

export const CustomNavListAccordion: React.FCWithChildren<Props> = (props) => {
  return <Accordion allowToggle {...props} />
}
