import { observer } from 'mobx-react-lite'
import FilmsStore, { getInitial } from '../store/FilmsStore'
import { Footer } from '../components/Footer'
import { MovieCardHeader } from '../components/MovieCardHeader'
import { PageContent } from '../components/PageContent'
import { Catalog } from '../components/Catalog'

Home.getInitialProps = getInitial

function Home() {
  return (
    <div>
      <MovieCardHeader film={FilmsStore.firstFilm} />
      <PageContent>
        <Catalog />
        <Footer />
      </PageContent>
    </div>
  )
}

export default observer(Home)
