import React from 'react'
import { Story, Meta } from '@storybook/react'

import { mockFilm } from '~/store/FilmsStore/mocks'
import { Card } from './Card'

export default {
  title: 'atoms/Card',
  component: Card,
  parameters: {
    backgrounds: {
      default: 'pink',
    },
  },
} as Meta

const Template: Story<React.ComponentProps<typeof Card>> = (args) => <Card {...args} />

export const Default = Template.bind({})
Default.args = {
  film: mockFilm,
}
Default.decorators = [
  (Story) => (
    <div style={{ width: 300 }}>
      <Story />
    </div>
  ),
]
