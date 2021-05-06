import { SyntheticEvent, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { styled } from 'linaria/react'
import type { NextPage } from 'next'

import { RatingStars, TextArea } from '~/design/atoms'
import { Header } from '~/design/molecules'
import { getInitialFilms } from '~/utils/getInitialFilms'
import { withAuth } from '~/store/hocs'
import { useMobxStores } from '~/store'

const Root = styled.section`
  position: relative;
  z-index: 1;
  min-height: 100vh;
  padding-bottom: 80px;
  color: var(--color-primary);
  background-color: #e1b0b2;
`

const Top = styled.div`
  position: relative;
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

const ReviewBlock = styled.div`
  width: 100%;
  max-width: 520px;
  margin: 0 auto;
  padding-top: 62px;
`

const RatingWrap = styled.div`
  display: flex;
  justify-content: center;
`

const MoviePageAddReviews: NextPage = () => {
  const { filmsStore } = useMobxStores()
  const router = useRouter()
  const id = router.query.id as string
  const film = filmsStore.selectFilmById(id)

  const [rating, setRating] = useState('4')
  const [text, setText] = useState('')

  if (!film) {
    return <>404</>
  }

  const handleStars = (value: string) => {
    setRating(value)
  }

  const handleText = (textAreaText: string) => {
    setText(textAreaText)
  }

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault()
    console.log('submit', { text, rating })
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
    <Root>
      <Top>
        <Background>
          <Image src={film.background_image} alt={film.name} />
        </Background>
        <Header title={headerTitle} />
        <Poster>
          <PosterImage
            src={film.poster_image}
            alt={`${film.name} poster`}
            width="218"
            height="327"
          />
        </Poster>
      </Top>

      <ReviewBlock>
        <form onSubmit={handleSubmit}>
          <RatingWrap>
            <RatingStars name="rating" onChange={handleStars} currentRating={rating} />
          </RatingWrap>
          <TextArea
            value={text}
            name="review-text"
            placeholder="Review text"
            onChange={handleText}
          />
        </form>
      </ReviewBlock>
    </Root>
  )
}

MoviePageAddReviews.getInitialProps = getInitialFilms

export default withAuth(MoviePageAddReviews)
