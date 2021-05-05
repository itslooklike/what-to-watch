import type { NextPage } from 'next'

import { Footer, Header } from '~/design/molecules'
import { Catalog } from '~/design/organisms'

const MyList: NextPage = () => {
  console.log()

  return (
    <div>
      <Header />
      <div>
        <Catalog />
      </div>
      <Footer />
    </div>
  )
}

MyList.getInitialProps = async ({ mobxStores }) => {
  await mobxStores.filmsStore.getFilms()
  return {}
}

export default MyList
