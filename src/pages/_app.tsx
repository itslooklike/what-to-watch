import FilmsStore from '../store/FilmsStore'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const { initialFilmsStore, ...restPageProps } = pageProps

  if (initialFilmsStore) {
    FilmsStore.hydrate(initialFilmsStore)
  }

  return <Component {...restPageProps} />
}

export default MyApp
