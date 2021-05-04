import { SyntheticEvent, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { styled } from 'linaria/react'
import type { NextPage } from 'next'

import { RatingStars, TextArea } from '~/design/atoms'
import { Header } from '~/design/molecules'
import { useMobxStores } from '~/store'

const Root = styled.section`
  padding-bottom: 45px;
  min-height: 100vh;
  position: relative;
  z-index: 1;
  color: #eee5b5;
  padding-bottom: 78px;
  background-color: #e1b0b2;
`

const Top = styled.div`
  position: relative;
`

const Background = styled.div`
  position: absolute;
  z-index: -1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`

const Image = styled.img`
  vertical-align: top;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
`

const Poster = styled.div`
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 0 8px 0 rgb(0 0 0 / 40%);
  flex-shrink: 0;
  width: 132px;
  height: 198px;
  margin-left: auto;
  margin-right: auto;
  transform: translateY(40px);
`

const PosterImage = styled.img`
  vertical-align: top;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const ReviewBlock = styled.div`
  padding-top: 62px;
  max-width: 520px;
  width: 100%;
  margin: 0 auto;
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
          <div>
            <RatingStars name="rating" onChange={handleStars} value={rating} />
          </div>
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

MoviePageAddReviews.getInitialProps = async ({ mobxStores }) => {
  await mobxStores.filmsStore.getFilms()
  return {}
}

export default MoviePageAddReviews