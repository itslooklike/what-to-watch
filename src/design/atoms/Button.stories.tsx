/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Story, Meta } from '@storybook/react'
import * as Icons from '~/icons'
import { Button } from './Button'

export default {
  title: 'atoms/Button',
  component: Button,
  parameters: {
    backgrounds: {
      default: 'pink',
    },
  },
} as Meta

const Template: Story<React.ComponentProps<typeof Button>> = (args) => (
  <Button {...args}>Hello</Button>
)

export const Default = Template.bind({})

export const Icon = Template.bind({})
Icon.args = {
  icon: 'IconAdd',
}

export const AllIcons = () => (
  <div>
    {Object.keys(Icons).map((IconName) => {
      const Btn = Template.bind({})
      return (
        <div style={{ margin: '0 1em 1em 0', display: 'inline-block' }}>
          <Btn icon={IconName as keyof typeof Icons} />
        </div>
      )
    })}
  </div>
)
