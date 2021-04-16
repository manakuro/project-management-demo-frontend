import React from 'react'
import { useReactNodeView } from '../ReactNodeView'

import { AtMention } from './AtMention'

const reg = /^@/

export const Paragraph: React.FC = (props) => {
  const context = useReactNodeView()

  if (reg.test(context.text ?? '')) {
    return <AtMention {...props} />
  }

  return <p>{props.children}</p>
}
