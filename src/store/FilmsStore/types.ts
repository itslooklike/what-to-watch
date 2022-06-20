type UploadUrl = {
  url: string
}

export interface IFilm {
  backgroundColor: string
  description: string
  director: string

  id: number
  name: string

  rating: number
  released: number
  run_time: number
  scores_count: number
  videoLink: string
  videoPreviewLink: string
  starring: {
    id: string
    name: string
  }[]
  genre: {
    id: string
    name: string
  }
  imageBackground: UploadUrl
  imagePoster: UploadUrl
  imagePreview: UploadUrl
}
