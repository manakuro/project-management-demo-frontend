import { ComponentStory, ComponentMeta } from '@storybook/react'
import React from 'react'
import { LayoutDefault } from 'src/components/organisms/Layout'
import { Container as Page } from './Container'

export default {
  title: 'Pages/Inbox',
  component: Page,
  parameters: {
    layout: 'fullscreen',
    nextRouter: {
      asPath: '/inbox',
      path: '/inbox/[[...inbox]]',
      pathname: '/inbox/[[...inbox]]',
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
