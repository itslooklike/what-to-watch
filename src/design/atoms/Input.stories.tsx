/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Story, Meta } from '@storybook/react'
import { Input } from './Input'

export default {
  title: 'atoms/Input',
  component: Input,
  parameters: {
    backgrounds: {
      default: 'pink',
    },
  },
} as Meta

const Template: Story<React.ComponentProps<typeof Input>> = (args) => <Input {...args} />

export const Default = Template.bind({})
Default.args = {
  id: 'test01',
}

export const WithError = Template.bind({})
WithError.args = {
  id: 'test01',
  isError: true,
}
