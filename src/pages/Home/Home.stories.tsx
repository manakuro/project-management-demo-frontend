import { ComponentStory, ComponentMeta } from '@storybook/react'
import React from 'react'
import { LayoutDefault } from 'src/components/organisms/Layout'
import { Component as Page } from './Component'

export default {
  title: 'Pages/Home',
  component: Page,
  parameters: {
    layout: 'fullscreen',
    nextRouter: {
      path: '/',
      query: 'index',
    },
  },
  decorators: [
    (Story) => (
      <LayoutDefault>
        <Story />
      </LayoutDefault>
    ),
  ],
} as ComponentMeta<typeof Page>

const Template: ComponentStory<typeof Page> = (args) => <Page {...args} />

export const Default = Template.bind({})
Default.args = {
  loading: false,
  fetchTaskDetailQuery: async () => {},
}
