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
  runTime: number
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
