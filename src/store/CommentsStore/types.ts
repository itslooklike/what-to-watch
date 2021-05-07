type TCommentUser = {
  is: number
  name: string
}

export interface IComment {
  id: number
  user: TCommentUser
  rating: string
  comment: string
  date: Date
}

export interface ICommentAdd {
  rating: number
  comment: string
}
