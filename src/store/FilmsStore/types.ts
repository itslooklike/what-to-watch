type UploadUrl = {
  url: string
}

export interface IFilm {
  id: string
  name: string
  backgroundColor: string
  description: string
  director: string
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
