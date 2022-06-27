type UploadUrl = {
  // url: string
  publicUrl: string
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
  imagePoster?: UploadUrl
  imagePreview?: UploadUrl
  imageBackground?: UploadUrl
}
