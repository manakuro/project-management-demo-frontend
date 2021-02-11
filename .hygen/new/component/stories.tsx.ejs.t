---
to: <%= absPath %>/<%= component_name %>.stories.tsx
---
import React from 'react'
import { <%= component_name %> } from './'
import { Story, Meta } from '@storybook/react/types-6-0'

type Props = React.ComponentProps<typeof <%= component_name %>>

const csf: Meta = {
  title: '<%= category %>/<%= component_name %>',
}

const Template: Story<Props> = (args) => <<%= component_name %> {...args} />

export const c1 = Template.bind({})
c1.storyName = 'default'

export default csf


