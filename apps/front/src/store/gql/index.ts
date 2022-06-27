import { gql } from 'graphql-request'

export const FilmFragment = gql`
  fragment FilmFragment on Film {
    id
    name
    description
    released
    backgroundColor
    rating
    scoresCount
    director
    videoLink
    videoPreviewLink
    runTime
    genre {
      id
      name
    }
    starring {
      id
      name
    }
    imagePoster {
      publicUrl
    }
    imagePreview {
      publicUrl
    }
    imageBackground {
      publicUrl
    }
  }
`

export const CommentFragment = gql`
  fragment CommentFragment on Comment {
    id
    comment
    rating
    date
    user {
      name
    }
  }
`
