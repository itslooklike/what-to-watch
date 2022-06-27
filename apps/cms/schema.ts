import { list } from '@keystone-6/core'
import { cloudinaryImage } from '@keystone-6/cloudinary'
import {
  text,
  integer,
  float,
  relationship,
  password,
  timestamp,
  select,
  image,
} from '@keystone-6/core/fields'
import { document } from '@keystone-6/fields-document'
import { Lists } from '.keystone/types'
import { IMG_STORE_TYPE, isCloudinary, cloudApis } from './config'

const cloudinaryStorage = cloudinaryImage({
  cloudinary: {
    cloudName: cloudApis.cloudName,
    apiKey: cloudApis.apiKey,
    apiSecret: cloudApis.apiSecret,
    folder: 'films',
  },
})

const minioStorage = image({ storage: IMG_STORE_TYPE === 'minio' ? 'minio_s3' : 'local' })

export const lists: Lists = {
  User: list({
    fields: {
      name: text({
        validation: { isRequired: true },
      }),
      email: text({
        validation: { isRequired: true },
        isIndexed: 'unique',
        isFilterable: true,
      }),
      password: password({
        validation: { isRequired: true },
      }),
      posts: relationship({
        ref: 'Post.author',
        many: true,
      }),
      favoriteFilms: relationship({
        ref: 'Film',
        many: true,
        ui: {
          displayMode: 'select',
          hideCreate: true,
        },
      }),
      favoriteActors: relationship({
        ref: 'Actor',
        many: true,
        ui: {
          displayMode: 'select',
          hideCreate: true,
        },
      }),
      comments: relationship({
        ref: 'Comment.user',
        many: true,
      }),
    },
    ui: {
      listView: {
        initialColumns: ['name', 'posts'],
      },
    },
  }),
  Post: list({
    fields: {
      title: text(),
      status: select({
        options: [
          { label: 'Published', value: 'published' },
          { label: 'Draft', value: 'draft' },
        ],
        defaultValue: 'draft',
        ui: {
          displayMode: 'segmented-control',
        },
      }),
      content: document({
        formatting: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
          [1, 2],
          [1, 2, 1],
        ],
        links: true,
        dividers: true,
      }),
      publishDate: timestamp(),
      author: relationship({
        ref: 'User.posts',
        ui: {
          displayMode: 'cards',
          cardFields: ['name', 'email'],
          inlineEdit: { fields: ['name', 'email'] },
          linkToItem: true,
          inlineConnect: true,
          inlineCreate: { fields: ['name', 'email'] },
        },
      }),
      tags: relationship({
        ref: 'Tag.posts',
        ui: {
          displayMode: 'cards',
          cardFields: ['name'],
          inlineEdit: { fields: ['name'] },
          linkToItem: true,
          inlineConnect: true,
          inlineCreate: { fields: ['name'] },
        },
        many: true,
      }),
    },
  }),
  Tag: list({
    ui: {
      isHidden: true,
    },
    fields: {
      name: text(),
      posts: relationship({ ref: 'Post.tags', many: true }),
    },
  }),
  Film: list({
    fields: {
      name: text(),
      description: text(),
      released: integer(),
      backgroundColor: text(),
      rating: float(),
      scoresCount: integer(),
      director: text(),
      videoLink: text(),
      videoPreviewLink: text(),
      starring: relationship({ ref: 'Actor.films', many: true }),
      runTime: integer(),
      genre: relationship({ ref: 'Genre.films' }),
      comments: relationship({ ref: 'Comment.film', many: true }),

      ...(isCloudinary
        ? {
            imagePoster: cloudinaryStorage,
            imagePreview: cloudinaryStorage,
            imageBackground: cloudinaryStorage,
          }
        : {
            imagePoster: minioStorage,
            imagePreview: minioStorage,
            imageBackground: minioStorage,
          }),
    },
  }),
  Comment: list({
    fields: {
      comment: text(),
      rating: integer(),
      date: timestamp(),
      film: relationship({ ref: 'Film.comments' }),
      user: relationship({ ref: 'User.comments' }),
    },
  }),
  Genre: list({
    // ui: {
    //   isHidden: true,
    // },
    fields: {
      name: text(),
      films: relationship({ ref: 'Film.genre', many: true }),
    },
  }),
  Actor: list({
    fields: {
      name: text(),
      films: relationship({
        ref: 'Film.starring',
        many: true,
      }),
    },
  }),
}
