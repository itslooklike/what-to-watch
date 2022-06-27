import Head from 'next/head'

import { useRouter } from 'next/router'
import Link from 'next/link'
import { styled } from '@linaria/react'
import type { NextPage } from 'next'

import { Header } from '~/design/molecules'
import { LNoFooter } from '~/design/layouts'
import { ReviewBlock } from '~/components/ReviewBlock'
import { getInitialFilms } from '~/store/utils'
import { useAuth } from '~/store/hooks'
import { useMobxStores } from '~/store'

const Top = styled.div`
  position: relative;
  z-index: 1;
`

const Background = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  vertical-align: top;
`

const Poster = styled.div`
  flex-shrink: 0;
  width: 132px;
  height: 198px;
  margin-right: auto;
  margin-left: auto;
  overflow: hidden;
  border-radius: 5px;
  box-shadow: 0 0 8px 0 rgb(0 0 0 / 40%);
  transform: translateY(40px);
`

const PosterImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  vertical-align: top;
`

const ReviewContent = styled.div`
  flex-grow: 1;
  background-color: var(--color-secondary);
`

const MoviePageAddReviews: NextPage = () => {
  useAuth()

  const { filmsStore } = useMobxStores()
  const router = useRouter()
  const id = router.query.id as string
  const film = filmsStore.selectFilmById(id)

  if (!film) {
    return <>404</>
  }

  const headerTitle = (
    <>
      <Link href={`/m/${film.id}`}>
        <a>{film.name}</a>
      </Link>{' '}
      / Add review
    </>
  )

  return (
    <>
      <Head>
        <title>WTW - {film.name}</title>
      </Head>
      <LNoFooter>
        <Top>
          <Background>
            <Image src={film.imageBackground?.publicUrl} alt={film.name} />
          </Background>
          <Header title={headerTitle} />
          <Poster>
            <PosterImage
              src={film.imagePoster?.publicUrl}
              alt={`${film.name} poster`}
              width="218"
              height="327"
            />
          </Poster>
        </Top>

        <ReviewContent>
          <ReviewBlock filmId={id} />
        </ReviewContent>
      </LNoFooter>
    </>
  )
}

MoviePageAddReviews.getInitialProps = getInitialFilms

export default MoviePageAddReviews
