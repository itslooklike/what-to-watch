export interface IUserSubmit {
  email: string
  password: string
}

export interface IUser {
  id: string
  email: string
  name: string
  avatar_url: string
}

export interface IUserResponseError {
  error: string
}
