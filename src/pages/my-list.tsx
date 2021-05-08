import Head from 'next/head'
import type { NextPage } from 'next'

import { ContentWrap } from '~/design/atoms'
import { Footer, Header, MovieCardList } from '~/design/molecules'
import { withAuth } from '~/store/hocs'
import { getInitialFavorite } from '~/store/utils/getInitialFavorite'
import { useMobxStores } from '~/store'

const MyList: NextPage = () => {
  const { favoriteStore } = useMobxStores()

  return (
    <>
      <Head>
        <title>WTW - Favorites</title>
      </Head>
      <div>
        <Header />
        <ContentWrap>
          <MovieCardList films={favoriteStore.data} />
        </ContentWrap>
        <Footer />
      </div>
    </>
  )
}

// FIXME: fix type
const WithAuth = withAuth(MyList) as typeof MyList

WithAuth.getInitialProps = getInitialFavorite

export default WithAuth
