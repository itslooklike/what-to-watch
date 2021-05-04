/// <reference types="next" />
/// <reference types="next/types/global" />

import 'next'
import { IStore } from './src/store'

declare module 'next' {
  export interface NextPageContext {
    mobxStores: IStore
  }
}
