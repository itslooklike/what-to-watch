export const IMG_STORE_TYPE: 'cloudinary' | 'minio' | 'local' = 'cloudinary'

export const isCloudinary = IMG_STORE_TYPE === 'cloudinary'

export const cloudApis = {
  cloudName: process.env.CLOUDINARY_NAME as string,
  apiKey: process.env.CLOUDINARY_API_KEY as string,
  apiSecret: process.env.CLOUDINARY_SECRET as string,
}
