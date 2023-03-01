export const createAudioUrl = (audioName: string) => {
  return import.meta.env.VITE_BASE_AUDIO_URL + audioName
}
