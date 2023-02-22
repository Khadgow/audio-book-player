export interface Book {
  id: string
  name: string
  imageUrl: string
  author: {
    id: string
    surname: string
    name: string
    patronymic: string
  }
}
