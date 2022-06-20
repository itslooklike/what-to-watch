import Head from 'next/head'
import { SyntheticEvent, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { styled } from '@linaria/react'
import type { NextPage } from 'next'

import { RatingStars, TextArea } from '~/design/atoms'
import { Header } from '~/design/molecules'
import { LNoFooter } from '~/design/layouts'
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

const ReviewBlock = styled.div`
  width: 100%;
  max-width: 560px;
  margin: 0 auto;
  padding: 62px var(--base-content-padding) 20px;
`

const RatingWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
`

const MoviePageAddReviews: NextPage = () => {
  useAuth()

  const { filmsStore, commentsStore } = useMobxStores()
  const router = useRouter()
  const id = router.query.id as string
  const film = filmsStore.selectFilmById(id)

  const [rating, setRating] = useState('4')
  const [comment, setComment] = useState('')

  if (!film) {
    return <>404</>
  }

  const handleStars = (value: string) => {
    setRating(value)
  }

  const handleText = (textAreaText: string) => {
    setComment(textAreaText)
  }

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault()

    await commentsStore.addComment(+id, { rating: +rating, comment })

    if (!commentsStore.error) {
      router.push(`/m/${id}/reviews`)
    }
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
            <Image src={film.imageBackground.url} alt={film.name} />
          </Background>
          <Header title={headerTitle} />
          <Poster>
            <PosterImage
              src={film.imagePoster.url}
              alt={`${film.name} poster`}
              width="218"
              height="327"
            />
          </Poster>
        </Top>

        <ReviewContent>
          <ReviewBlock>
            <form onSubmit={handleSubmit}>
              <RatingWrap>
                <RatingStars name="rating" onChange={handleStars} currentRating={rating} />
              </RatingWrap>
              <TextArea
                loading={commentsStore.loading}
                value={comment}
                name="review-text"
                placeholder="Review text"
                onChange={handleText}
              />
            </form>
          </ReviewBlock>
        </ReviewContent>
      </LNoFooter>
    </>
  )
}

MoviePageAddReviews.getInitialProps = getInitialFilms

export default MoviePageAddReviews
