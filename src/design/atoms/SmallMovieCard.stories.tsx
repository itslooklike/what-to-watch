import React from 'react'
import { Story, Meta } from '@storybook/react'

import { SmallMovieCard } from './SmallMovieCard'

import { mockFilm } from '~/store/FilmsStore/mocks'

export default {
  title: 'atoms/SmallMovieCard',
  component: SmallMovieCard,
  parameters: {
    backgrounds: {
      default: 'pink',
    },
  },
} as Meta

const Template: Story<React.ComponentProps<typeof SmallMovieCard>> = (args) => (
  <SmallMovieCard {...args} />
)

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
