type TCommentUser = {
  name: string
}

export interface IComment {
  id: string
  comment: string
  rating: number
  date: Date
  user: TCommentUser
}

export interface ICommentAdd {
  rating: number
  comment: string
}
