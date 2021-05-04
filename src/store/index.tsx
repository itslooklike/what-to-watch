import React from 'react'
import { isServer } from '../services/isServer'
import { FilmsStore } from './FilmsStore'

export interface IStore {
  filmsStore: FilmsStore
}

let clientSideStores: IStore

export function getStores(initialData = { filmsStoreInitialData: {} }) {
  if (isServer) {
    return {
      filmsStore: new FilmsStore(initialData.filmsStoreInitialData),
    }
  }

  if (!clientSideStores) {
    clientSideStores = {
      filmsStore: new FilmsStore(initialData.filmsStoreInitialData),
    }
  }

  return clientSideStores
}

export type TInitialStoreData = Parameters<typeof getStores>[0]

// FIXME: remove ignore
// @ts-ignore
const StoreContext = React.createContext<IStore>({})

type TStoreProvider = {
  value: IStore
  children: React.ReactElement
}

export function StoreProvider(props: TStoreProvider) {
  return <StoreContext.Provider value={props.value}>{props.children}</StoreContext.Provider>
}

export function useMobxStores() {
  return React.useContext(StoreContext)
}
