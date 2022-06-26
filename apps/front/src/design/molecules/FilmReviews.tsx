import { styled } from '@linaria/react'

import { Review } from '~/design/atoms'
import { IComment } from '~/store/CommentsStore'

const Root = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 60px;
  padding-top: 20px;
`

const Text = styled.p`
  margin: 0;
  color: var(--color-black);
`

type TProps = {
  comments: IComment[]
}

export const FilmReviews = ({ comments }: TProps) => (
  <Root>
    {comments.length > 0 ? (
      comments.map((comment) => (
        <Review
          key={comment.id}
          author={comment.user.name}
          date={comment.date}
          rating={comment.rating}
        >
          {comment.comment}
        </Review>
      ))
    ) : (
      <Text>No Reviews</Text>
    )}
  </Root>
)
