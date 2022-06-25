import 'next'
import { IStore } from './store'

declare module 'next' {
  export interface NextPageContext {
    mobxStores: IStore
  }
}
