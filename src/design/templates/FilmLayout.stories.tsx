import React from 'react'
import { Story, Meta } from '@storybook/react'

import { FilmLayout } from './FilmLayout'

import { getStores, StoreProvider, TInitialStoreData } from '~/store'
import { mockFilm } from '~/store/FilmsStore/mocks'
import { mocksUser } from '~/store/UserStore/mocks'

export default {
  title: 'templates/FilmLayout',
  component: FilmLayout,
} as Meta

const Template: Story<React.ComponentProps<typeof FilmLayout>> = (args) => <FilmLayout {...args} />

export const Default = Template.bind({})
Default.args = {
  film: mockFilm,
  children: <>CONTENT HERE</>,
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
