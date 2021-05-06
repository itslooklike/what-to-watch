/* eslint-disable react/jsx-props-no-spreading */

import 'normalize.css'
import './globals.css'

import React from 'react'
import App from 'next/app'
import type { AppProps, AppContext } from 'next/app'

import { getStores, StoreProvider, TInitialStoreData } from '~/store'

type TCustomProps = {
  initialStoreData: TInitialStoreData
}

function MyApp({ Component, pageProps, initialStoreData }: AppProps & TCustomProps) {
  const stores = getStores(initialStoreData)

  return (
    <StoreProvider value={stores}>
      <Component {...pageProps} />
    </StoreProvider>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const mobxStores = getStores()
  appContext.ctx.mobxStores = mobxStores
  const appProps = await App.getInitialProps(appContext)

  const initialStoreData: TInitialStoreData = {
    filmsStoreInitialData: mobxStores.filmsStore.hydrate(),
    userStoreInitialData: mobxStores.userStore.hydrate(),
    favoriteStoreInitialData: mobxStores.favoriteStore.hydrate(),
  }

  return {
    ...appProps,
    initialStoreData,
  }
}

export default MyApp
