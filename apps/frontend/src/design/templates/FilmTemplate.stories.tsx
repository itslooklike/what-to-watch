import React from 'react'
import { Story, Meta } from '@storybook/react'


import { getStores, StoreProvider, TInitialStoreData } from '~/store'
import { mockFilm } from '~/store/FilmsStore/mocks'
import { mocksUser } from '~/store/UserStore/mocks'
import { FilmTemplate } from './FilmTemplate'

export default {
  title: 'templates/FilmTemplate',
  component: FilmTemplate,
} as Meta

const Template: Story<React.ComponentProps<typeof FilmTemplate>> = (args) => (
  <FilmTemplate {...args} />
)

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
      commentsStoreInitialData: {},
    }

    const stores = getStores(initialStoreData)

    return (
      <StoreProvider value={stores}>
        <Story />
      </StoreProvider>
    )
  },
]
