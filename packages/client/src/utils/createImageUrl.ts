export const createImageUrl = (imageName: string) => {
  return import.meta.env.VITE_BASE_IMAGE_URL + imageName
}
