import Head from 'next/head'
import type { NextPage } from 'next'

import { ContentWrap } from '~/design/atoms'
import { Header, MovieCardList } from '~/design/molecules'
import { BasicWithFooter } from '~/design/layouts'
import { useAuth } from '~/store/hooks'
import { getInitialFavorite } from '~/store/utils/getInitialFavorite'
import { useMobxStores } from '~/store'

const MyList: NextPage = () => {
  useAuth()
  const { favoriteStore } = useMobxStores()

  return (
    <>
      <Head>
        <title>WTW - Favorites</title>
      </Head>
      <BasicWithFooter>
        <Header title="My Films" />
        <ContentWrap>
          <MovieCardList films={favoriteStore.data} />
        </ContentWrap>
      </BasicWithFooter>
    </>
  )
}

MyList.getInitialProps = getInitialFavorite

export default MyList
