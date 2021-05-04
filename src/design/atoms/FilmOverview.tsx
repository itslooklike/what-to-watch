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
  background: rgba(255, 255, 255, 0.24);
  border-radius: 8px;
  font-size: 30px;
  line-height: 36px;
  color: rgba(0, 0, 0, 0.5);
  padding: 8px 12px;
  margin-right: 9px;
`

const RatingMeta = styled.p`
  margin: 0;
  font-size: 19px;
  color: rgba(0, 0, 0, 0.5);
  display: flex;
`

const RatingLevel = styled.span`
  font-weight: bold;

  ::after {
    content: '·';
    margin-left: 4px;
    margin-right: 4px;
    font-weight: 400;
  }
`

const RatingCount = styled.span`
  color: #382c2a;
`

const Text = styled.div`
  color: #252525;
  width: 635px;
  font-size: 19px;
  line-height: 27px;
`

const TextDirector = styled.p`
  line-height: 21px;
  color: rgba(0, 0, 0, 0.4);
`

const TextStarring = styled.p`
  line-height: 24px;
  color: rgba(0, 0, 0, 0.4);
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
