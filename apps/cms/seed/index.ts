import fs from 'fs'
import path from 'path'
import { type KeystoneContext } from '@keystone-6/core/types'
import { films } from './data-films'
import { prepareToUpload } from './utils'

// TODO: вытащить тип из схемы
type FilmProps = typeof films[0]

export async function insertSeedData(context: KeystoneContext) {
  console.log(`🌱 Inserting seed data`)

  const assetsFolder = path.resolve(__dirname + '/../public/images')

  if (!fs.existsSync(assetsFolder)) {
    fs.mkdirSync(assetsFolder, { recursive: true })
  }

  console.log(`💀 Reset data`)
  // `Promise.all` - not work?
  await context.prisma.Film.deleteMany()
  await context.prisma.Genre.deleteMany()
  await context.prisma.Actor.deleteMany()

  const createFilm = async (filmData: FilmProps) => {
    const imagePoster = path.resolve(__dirname + filmData.poster_image)
    const imagePreview = path.resolve(__dirname + filmData.preview_image)
    const imageBackground = path.resolve(__dirname + filmData.background_image)

    let genre = await context.prisma.Genre.findFirst({ where: { name: filmData.genre } })

    if (!genre) {
      genre = await context.db.Genre.createOne({ data: { name: filmData.genre } })
      console.log(`🫀 Adding Genre: ${genre.name}`)
    }

    const actors = []

    if (filmData.starring.length) {
      for (const start of filmData.starring) {
        let actor = await context.prisma.Actor.findFirst({ where: { name: start } })

        if (!actor) {
          actor = await context.db.Actor.createOne({ data: { name: start } })
          console.log(`🕴 Adding Actor: ${actor.name}`)
        }

        actors.push(actor)
      }
    }

    await context.query.Film.createOne({
      data: {
        name: filmData.name,
        description: filmData.description,
        released: filmData.released,
        backgroundColor: filmData.background_color,
        rating: filmData.rating,
        scoresCount: filmData.scores_count,
        director: filmData.director,
        runTime: filmData.run_time,
        videoLink: filmData.video_link,
        videoPreviewLink: filmData.preview_video_link,
        starring: {
          connect: actors.map(({ id }) => ({ id })),
        },
        genre: {
          connect: { id: genre.id },
        },
        imagePoster: {
          upload: prepareToUpload(imagePoster),
        },
        imagePreview: {
          upload: prepareToUpload(imagePreview),
        },
        imageBackground: {
          upload: prepareToUpload(imageBackground),
        },
      },
    })
  }

  for (const film of films) {
    console.log(`📽 Adding Film: ${film.name}`)
    await createFilm(film)
  }

  console.log(`✅ Seed data inserted`)
}
