/* eslint-disable react/jsx-props-no-spreading */

import 'normalize.css'
import './globals.css'

import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import type { AppProps, AppContext } from 'next/app'

import { getStores, StoreProvider, TInitialStoreData } from '~/store'

type TCustomProps = {
  initialStoreData: TInitialStoreData
}

function MyApp({ Component, pageProps, initialStoreData }: AppProps & TCustomProps) {
  const stores = getStores(initialStoreData)

  return (
    <>
      <Head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Head>
      <StoreProvider value={stores}>
        <Component {...pageProps} />
      </StoreProvider>
    </>
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
    commentsStoreInitialData: mobxStores.commentsStore.hydrate(),
  }

  return {
    ...appProps,
    initialStoreData,
  }
}

export default MyApp
