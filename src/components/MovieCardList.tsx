import Link from 'next/link'
import { styled } from 'linaria/react'
import { SmallMovieCard } from './SmallMovieCard'

const Root = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  margin-bottom: 60px;

  :last-child {
    margin-bottom: 0;
  }
`

const Wrap = styled.div`
  width: calc((100% - 30px) / 4);
  margin-right: 10px;
  margin-bottom: 55px;

  :nth-child(4n) {
    margin-right: 0;
  }

  :nth-last-child(-n + 4) {
    margin-bottom: 0;
  }
`

export function MovieCardList(props) {
  const { films } = props
  return (
    <Root>
      {films.map((film, idx) => {
        return (
          <Wrap key={idx}>
            <Link passHref href="/movie-page">
              <SmallMovieCard
                name={film.name}
                href={film.url}
                imgSrc={film.imgSrc}
                videoLink={film.videoLink}
              />
            </Link>
          </Wrap>
        )
      })}
    </Root>
  )
}
