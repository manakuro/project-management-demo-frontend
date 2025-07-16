import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { LayoutDefault } from 'src/components/ui/organisms/Layout';
import { Container as Page } from './Container';

export default {
  title: 'Pages/Home',
  component: Page,
  parameters: {
    layout: 'fullscreen',
    nextRouter: {
      asPath: '/',
      path: '/',
      query: 'index',
      pathname: '/[[...index]]',
    },
  },
  decorators: [
    (Story) => (
      <LayoutDefault>
        <Story />
      </LayoutDefault>
    ),
  ],
} as ComponentMeta<typeof Page>;

const Template: ComponentStory<typeof Page> = (args) => <Page {...args} />;

export const Default = Template.bind({});
