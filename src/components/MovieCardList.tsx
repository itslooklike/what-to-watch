import Link from 'next/link'
import { styled } from 'linaria/react'
import { SmallMovieCard } from './SmallMovieCard'
import { IFilm } from '../store/FilmsStore'

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

type TProps = {
  films: IFilm[]
}

export function MovieCardList(props: TProps) {
  const { films } = props

  return (
    <Root>
      {films.map((film, idx) => {
        return (
          <Wrap key={idx}>
            <Link href={`/m/${film.id}`} passHref>
              <SmallMovieCard film={film} />
            </Link>
          </Wrap>
        )
      })}
    </Root>
  )
}
