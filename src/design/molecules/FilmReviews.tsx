import { styled } from 'linaria/react'

import { Review } from '~/design/atoms'
import { IComment } from '~/store/CommentsStore'

const Root = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  padding-top: 20px;
`

type TProps = {
  comments: IComment[]
}

export const FilmReviews = ({ comments }: TProps) => (
  <Root>
    {comments.map((comment) => (
      <Review
        key={comment.id}
        author={comment.user.name}
        date={comment.date}
        rating={comment.rating}
      >
        {comment.comment}
      </Review>
    ))}
  </Root>
)
