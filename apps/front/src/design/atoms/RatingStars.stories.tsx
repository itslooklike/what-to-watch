import React from 'react'
import { Story, Meta } from '@storybook/react'

import { RatingStars } from './RatingStars'

export default {
  title: 'atoms/RatingStars',
  component: RatingStars,
  parameters: {
    backgrounds: {
      default: 'pink',
    },
  },
} as Meta

const Template: Story<React.ComponentProps<typeof RatingStars>> = (args) => (
  <RatingStars {...args} />
)

export const Default = Template.bind({})
Default.args = {
  name: 'test02',
  currentRating: '4',
}
