/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Story, Meta } from '@storybook/react'
import { getStores, StoreProvider, TInitialStoreData } from '~/store'
import { Catalog } from './Catalog'

import { mockFilms } from '~/store/FilmsStore/mocks'

export default {
  title: 'organisms/Catalog',
  component: Catalog,
} as Meta

const Template: Story<React.ComponentProps<typeof Catalog>> = () => <Catalog />

export const Default = Template.bind({})
Default.decorators = [
  (Story) => {
    const initialStoreData: TInitialStoreData = {
      filmsStoreInitialData: {
        data: mockFilms,
      },
      userStoreInitialData: {},
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
