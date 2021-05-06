/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Story, Meta } from '@storybook/react'
import { mockFilm } from '~/store/FilmsStore/mocks'
import { FilmOverview } from './FilmOverview'

export default {
  title: 'atoms/FilmOverview',
  component: FilmOverview,
  parameters: {
    backgrounds: {
      default: 'pink',
    },
  },
} as Meta

const Template: Story<React.ComponentProps<typeof FilmOverview>> = (args) => (
  <FilmOverview {...args} />
)

export const Default = Template.bind({})
Default.args = {
  film: mockFilm,
}
