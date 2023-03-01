import { Audiobook } from './Audiobook'
import { Author } from './Author'

export interface Book {
  id: string
  name: string
  imageUrl: string
  author: Author
}

export type BookWithAudio = Book & {
  audiobooks: Audiobook[]
}
