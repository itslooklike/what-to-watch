import React from 'react'
import { styled } from 'linaria/react'

import { Review } from '~/design/atoms'
import type { IFilm } from '~/store/FilmsStore'

const Root = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  padding-top: 20px;
`

const MOCKS = [
  {
    author: 'Kate Muir',
    humanDate: 'December 24, 2016',
    date: '2016-12-24',
    rating: '8,9',
    content: (
      <>
        Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European
        kitsch of one of the director's funniest and most exquisitely designed movies in years.
      </>
    ),
  },
  {
    author: 'Bill Goodykoontz',
    humanDate: 'November 18, 2015',
    date: '2015-11-18',
    rating: '8,0',
    content: (
      <>
        Anderson's films are too precious for some, but for those of us willing to lose ourselves in
        them, they're a delight. "The Grand Budapest Hotel" is no different, except that he has
        added a hint of gravitas to the mix, improving the recipe.
      </>
    ),
  },
  {
    author: 'Amanda Greever',
    humanDate: 'November 18, 2015',
    date: '2015-11-18',
    rating: '8,0',
    content: (
      <>
        I didn't find it amusing, and while I can appreciate the creativity, it's an hour and 40
        minutes I wish I could take back.
      </>
    ),
  },
  {
    author: 'Matthew Lickona',
    humanDate: 'December 20, 2016',
    date: '2016-12-20',
    rating: '8,0',
    content: (
      <>
        The mannered, madcap proceedings are often delightful, occasionally silly, and here and
        there, gruesome and/or heartbreaking.
      </>
    ),
  },
  {
    author: 'Paula Fleri-Soler',
    humanDate: 'December 20, 2016',
    date: '2016-12-20',
    rating: '7,6',
    content: (
      <>
        It is certainly a magical and childlike way of storytelling, even if the content is a little
        more adult.
      </>
    ),
  },
  {
    author: 'Paula Fleri-Soler',
    humanDate: 'December 20, 2016',
    date: '2016-12-20',
    rating: '7,0',
    content: (
      <>
        It is certainly a magical and childlike way of storytelling, even if the content is a little
        more adult.
      </>
    ),
  },
]

type TProps = {
  film: IFilm
}

export const FilmReviews = (props: TProps) => {
  const { film } = props

  return (
    <Root>
      {MOCKS.map((feedback, idx) => {
        return (
          <Review
            author={feedback.author}
            humanDate={feedback.humanDate}
            date={feedback.date}
            rating={feedback.rating}
            key={idx}
          >
            {feedback.content}
          </Review>
        )
      })}
    </Root>
  )
}
