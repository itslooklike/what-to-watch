import React from 'react'
import { styled } from 'linaria/react'

import type { IFilm } from '~/store/FilmsStore'

const Rating = styled.div`
  display: flex;
  align-items: center;
  padding-top: 35px;
  padding-bottom: 25px;
`

const RatingScore = styled.div`
  margin-right: 9px;
  padding: 8px 12px;
  color: var(--color-black-opacity);
  font-size: 30px;
  line-height: 36px;
  background-color: var(--color-white-opacity);
  border-radius: 8px;
`

const RatingMeta = styled.p`
  display: flex;
  margin: 0;
  color: var(--color-black-opacity);
  font-size: 19px;
`

const RatingLevel = styled.span`
  font-weight: bold;

  ::after {
    margin-right: 4px;
    margin-left: 4px;
    font-weight: 400;
    content: '·';
  }
`

const RatingCount = styled.span`
  color: var(--color-black-light);
`

const Text = styled.div`
  width: 635px;
  color: var(--color-black);
  font-size: 19px;
  line-height: 27px;
`

const TextDirector = styled.p`
  color: var(--color-black-opacity);
  line-height: 21px;
`

const TextStarring = styled.p`
  color: var(--color-black-opacity);
  line-height: 24px;
`

type TProps = {
  film: IFilm
}

export const FilmOverview = (props: TProps) => {
  const { film } = props

  return (
    <div>
      <Rating>
        <RatingScore>{film.rating}</RatingScore>
        <RatingMeta>
          <RatingLevel>Very good</RatingLevel>
          <RatingCount>{film.rating} ratings</RatingCount>
        </RatingMeta>
      </Rating>
      <Text>
        <p>{film.description}</p>
        <TextDirector>
          <strong>Director: {film.director}</strong>
        </TextDirector>
        <TextStarring>
          <strong>Starring: {film.starring.join(', ')} and other</strong>
        </TextStarring>
      </Text>
    </div>
  )
}
