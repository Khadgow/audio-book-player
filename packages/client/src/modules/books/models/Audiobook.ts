import { Book } from './Book'
import { Author } from './Author'
import { VoiceActor } from './VoiceActor'
import { Audio } from './Audio'

export interface Audiobook {
  id: string
  name: string
  duration: number
  voiceActor: VoiceActor
  audio: Audio[]
}
export type AudiobookWithBookInfo = Audiobook & {
  author: Author
  book: Book
}
