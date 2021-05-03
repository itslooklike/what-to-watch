import './globals.css'

import FilmsStore from '../store/FilmsStore'

type TProps = {
  Component: any
  pageProps: any
}

function MyApp({ Component, pageProps }: TProps) {
  const { initialFilmsStore, ...restPageProps } = pageProps

  if (initialFilmsStore) {
    FilmsStore.hydrate(initialFilmsStore)
  }

  return <Component {...restPageProps} />
}

export default MyApp
