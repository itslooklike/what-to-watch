import { SyntheticEvent, useState } from 'react'
import { styled } from '@linaria/react'
import { useRouter } from 'next/router'
import { observer } from 'mobx-react-lite'

import { useMobxStores } from '~/store'
import { RatingStars, TextArea } from '~/design/atoms'

const Block = styled.div`
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

export const ReviewBlock = observer(({ filmId }: { filmId: string }) => {
  const { commentsStore } = useMobxStores()
  const router = useRouter()

  const [rating, setRating] = useState('4')
  const [comment, setComment] = useState('')
  const handleStars = (value: string) => {
    setRating(value)
  }

  const handleText = (textAreaText: string) => {
    setComment(textAreaText)
  }

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault()

    await commentsStore.addComment(filmId, { rating: +rating, comment })

    if (!commentsStore.error) {
      router.push(`/m/${filmId}/reviews`)
    }
  }

  return (
    <Block>
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
    </Block>
  )
})
