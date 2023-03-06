import { Audio, AudiobookWithBookInfo } from 'modules/books'

export interface History {
  id: string
  audio: Audio
  audiobook: AudiobookWithBookInfo
  audioId: string
  audiobookId: string
  time: number
}
