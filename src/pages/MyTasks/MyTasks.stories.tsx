import { ComponentStory, ComponentMeta } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'
import React from 'react'
import { LayoutDefault } from 'src/components/organisms/Layout'
import { Container as Page } from './Container'

export default {
  title: 'Pages/MyTasks',
  component: Page,
  parameters: {
    layout: 'fullscreen',
    nextRouter: {
      asPath: '/my_tasks/list',
      path: '/my_tasks',
      query: 'my_tasks',
      pathname: '/my_tasks/[[...my_tasks]]',
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

export const List = Template.bind({})

export const Detail = Template.bind({})
Detail.parameters = {
  nextRouter: {
    asPath: '/my_tasks/0BA01GK0BWB1Z78B3A3PK795SFJW9',
    path: '/my_tasks/[[...my_tasks]]',
    pathname: '/my_tasks/[[...my_tasks]]',
    query: {
      my_tasks: ['0BA01GK0BWB1Z78B3A3PK795SFJW9'],
    },
    route: '/my_tasks/[[...my_tasks]]',
  },
}

export const Board = Template.bind({})
Board.parameters = {
  nextRouter: {
    asPath: '/my_tasks/board',
    path: '/my_tasks/board',
    query: 'board',
  },
}
Board.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await userEvent.click(await canvas.findByRole('tab', { name: 'Board' }))
}

export const Calendar = Template.bind({})
Calendar.parameters = {
  nextRouter: {
    asPath: '/my_tasks/calendar',
    path: '/my_tasks/calendar',
    query: 'calendar',
  },
}
Calendar.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await userEvent.click(await canvas.findByRole('tab', { name: 'Calendar' }))
}

export const Files = Template.bind({})
Files.parameters = {
  nextRouter: {
    asPath: '/my_tasks/files',
    path: '/my_tasks/files',
    query: 'files',
  },
}
Files.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await userEvent.click(await canvas.findByRole('tab', { name: 'Files' }))
}
