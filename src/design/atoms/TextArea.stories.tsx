/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Story, Meta } from '@storybook/react'
import { TextArea } from './TextArea'

export default {
  title: 'atoms/TextArea',
  component: TextArea,
  parameters: {
    backgrounds: {
      default: 'pink',
    },
  },
} as Meta

const Template: Story<React.ComponentProps<typeof TextArea>> = (args) => <TextArea {...args} />

export const Default = Template.bind({})
Default.args = {
  name: 'rating',
}
Default.decorators = [
  (Story) => (
    <div style={{ width: 300 }}>
      <Story />
    </div>
  ),
]
