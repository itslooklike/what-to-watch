/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Story, Meta } from '@storybook/react'
import { FilmCard } from './FilmCard'

import { getStores, StoreProvider, TInitialStoreData } from '~/store'
import { mockFilm } from '~/store/FilmsStore/mocks'
import { mocksUser } from '~/store/UserStore/mocks'

export default {
  title: 'organisms/FilmCard',
  component: FilmCard,
} as Meta

const Template: Story<React.ComponentProps<typeof FilmCard>> = (args) => <FilmCard {...args} />

export const Default = Template.bind({})
Default.args = {
  film: mockFilm,
  content: <>CONTENT HERE</>,
}
Default.decorators = [
  (Story) => {
    const initialStoreData: TInitialStoreData = {
      filmsStoreInitialData: {},
      userStoreInitialData: {
        data: mocksUser,
      },
      favoriteStoreInitialData: {},
    }

    const stores = getStores(initialStoreData)

    return (
      <StoreProvider value={stores}>
        <Story />
      </StoreProvider>
    )
  },
]
