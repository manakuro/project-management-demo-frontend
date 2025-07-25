import type { ComponentMeta, ComponentStory } from '@storybook/react';
import type React from 'react';
import { Container } from 'src/storybook/decorators/Container';
import { Component } from './Component';

type Props = React.ComponentProps<typeof Component>;

export default {
  title: 'Features/molecules/AttachmentBox',
  component: Component,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    ),
  ],
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => (
  <Component {...props()} {...args} />
);

export const PDF = Template.bind({});

function props(options?: Partial<Props>): Props {
  return {
    size: 'md',
    name: '/files/pdf-test.pdf',
    fileName: 'PDF',
    icon: 'outlineFilePdf',
    src: '/files/pdf-test.pdf',
    ...options,
  };
}
