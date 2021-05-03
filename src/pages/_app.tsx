import './globals.css'

import FilmsStore from '../store/FilmsStore'

function MyApp({ Component, pageProps }) {
  const { initialFilmsStore, ...restPageProps } = pageProps

  if (initialFilmsStore) {
    FilmsStore.hydrate(initialFilmsStore)
  }

  return <Component {...restPageProps} />
}

export default MyApp
